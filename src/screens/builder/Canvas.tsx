"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formDetailsSetter } from "@/lib/services/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { ComponentProps, useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { IFormState, TFormDetailsSetterAllowedField } from "@/types";
import ContentEditable from "@/components/contentEditable";
import { FormElement } from "./controllers";
import { FormValues } from "./types";
import ElementHandler from "./components/ElementHandler";
import { getActive, setActive } from "@/lib/services/form/controlState";
import { convertToString, isPrimitive, showToast } from "@/lib/utils";
import { shouldAppend, validate } from "./services/controls";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { getApplicableValidations } from "./services/validations";

type Props = {
  preview: boolean;
} & ComponentProps<"div">;

interface IItem {
  id: string;
  type: "INPUT";
}

export default function Canvas({ preview }: Props) {
  // states
  const selected = useAppSelector(getActive);

  // Hooks
  const {
    formFields,
    arrayFields,
    append,
    replace,
    move,
    remove,
    formMethod: form,
    clearErrors,
  } = useFormBuilder<FormValues>();
  const { name, description, controlConfig } = formFields;
  const dispatch = useAppDispatch();

  // handlers

  const handleSelect = useCallback(
    (identifier: string | number) => {
      dispatch(setActive(identifier));
    },
    [dispatch]
  );

  const handleFormDetailsChange = useCallback(
    (value: string | null, field: TFormDetailsSetterAllowedField) => {
      dispatch(formDetailsSetter({ field, value: value ?? "" }));
    },
    [dispatch]
  );

  const submit: SubmitHandler<FormValues> = useCallback(
    (value) => {
      let isErrors = false;
      value.controls.forEach((field, idx: number) => {
        const CConfig = findControlConfigById(field._id, controlConfig);

        if (CConfig?.validations) {
          const validations = getApplicableValidations(CConfig.validations);
          const typeOfValue =
            typeof field.value === "object" ? "object" : "string";
          let safeTypeValue;

          if (isPrimitive(field.value)) {
            safeTypeValue = convertToString(field.value);
          } else {
            safeTypeValue = field.value;
          }
          debugger;
          const result = validate({
            validations,
            value: safeTypeValue,
            type: typeOfValue,
          });

          const fieldName = `controls.${idx}.value` as const;
          if (!result.success) {
            isErrors = true;
            form.setError(fieldName, {
              message: result.message,
            });
          } else {
            clearErrors(fieldName);
          }
        }
      });

      if (!isErrors) {
        showToast({
          title: "Form Data",
          message: (
            <pre>
              <code>{JSON.stringify(value, null, 2)}</code>
            </pre>
          ),
        });
      }
    },
    [controlConfig, clearErrors, form]
  );

  if (arrayFields.length === 0 && controlConfig.length !== 0) {
    const fields: Omit<(typeof arrayFields)[0], "id">[] = [];
    controlConfig.forEach((control) => {
      let newRecord: Omit<(typeof arrayFields)[0], "id"> = {
        _id: control._id,
        value: "",
      };
      if (control.type === "CheckBox") {
        newRecord = {
          ...newRecord,
          value: {} as any,
        };
      }

      fields.push(newRecord);
    });
    append(fields);
  }

  // useEffects
  useEffect(() => {
    const isNew = shouldAppend(arrayFields, controlConfig);
    if (!isNew) {
      return;
    }
    if (controlConfig.length) {
      const control = controlConfig.at(-1);
      if (control) {
        let newRecord: Omit<(typeof arrayFields)[0], "id"> = {
          _id: control._id,
          value: "",
        };
        if (control.type === "CheckBox") {
          newRecord = {
            ...newRecord,
            value: {} as any,
          };
        }

        const isExists = arrayFields.find(
          ({ _id: fieldId }) => fieldId === newRecord._id
        );

        if (isExists) {
          return;
        }
        append(newRecord);
      }
    }
  }, [controlConfig, append, arrayFields]);

  return (
    <div className="shadow-md my-10 w-full max-w-[35rem] overflow-y-auto p-4 m-4 bg-white rounded-md">
      <div className="grid gap-1 mb-4">
        <ElementHandler
          preview={preview}
          onEdit={() => handleSelect("TITLE")}
          className="shadow-none"
        >
          <ContentEditable
            isEditMode={selected === "TITLE"}
            as={"h4"}
            className="text-2xl"
            onEdit={(value) => {
              handleFormDetailsChange(value, "name");
            }}
            value={name}
          />
        </ElementHandler>
        <ElementHandler
          preview={preview}
          onEdit={() => handleSelect("DESCRIPTION")}
          className="shadow-none"
        >
          <ContentEditable
            isEditMode={selected === "DESCRIPTION"}
            as={"p"}
            className="text-sm"
            onEdit={(value) => {
              handleFormDetailsChange(value, "description");
            }}
            value={description}
          />
        </ElementHandler>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
          {arrayFields.map(({ _id }, idx: number) => {
            const { properties, type, validations } = controlConfig?.[idx];
            return (
              <ElementHandler
                preview={preview}
                key={_id}
                onEdit={() => handleSelect(idx)}
                onRemove={() => remove(idx)}
                onMove={move}
                index={idx}
              >
                <FormElement<FormValues>
                  name={`controls.${idx}.value` as const}
                  type={type}
                  properties={properties}
                  control={form.control}
                  validations={validations}
                  clearErrors={clearErrors}
                />
              </ElementHandler>
            );
          })}
          <Button type="submit" size={"lg"} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

const findControlConfigById = (
  _id: string,
  config: IFormState["controlConfig"]
) => {
  return config.find((item) => item._id === _id);
};
