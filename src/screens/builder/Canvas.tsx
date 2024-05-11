"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formDetailsSetter, selectForm } from "@/lib/services/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useCallback, useEffect, useId, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  ControlTypes,
  IFormState,
  TFormDetailsSetterAllowedField,
} from "@/types";
import ContentEditable from "@/components/contentEditable";
import { FormElement } from "./controllers";
import { FormValues } from "./types";
import ElementHandler from "./components/ElementHandler";
import { getActive, setActive } from "@/lib/services/form/controlState";
import { showToast } from "@/lib/utils";
import { shouldAppend, validate } from "./services/controls";
import { useFormBuilder } from "./hooks/useFormBuilder";

interface Props {}

interface IItem {
  id: string;
  type: "INPUT";
}

export default function Canvas({}: Props) {
  // states
  const selected = useAppSelector(getActive);

  // Hooks
  const {
    formFields,
    arrayFields,
    append,
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
      debugger;
      value.controls.forEach((field, idx: number) => {
        const CConfig = findControlConfigById(field._id, controlConfig);
        if (CConfig?.validations) {
          const validations = CConfig.validations;
          const typeOfValue =
            typeof field.value === "string" ? "string" : "object";
          const result = validate({
            validations,
            value: field.value,
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
    [controlConfig]
  );

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
            value: {},
          };
        }
        append(newRecord);
      }
    }
  }, [controlConfig, append, arrayFields]);

  return (
    <div className="shadow-md my-10 min-w-[35rem] overflow-y-auto p-4 bg-white rounded-md">
      <div className="grid gap-1 mb-4">
        <ElementHandler
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
            const { properties, type, validations } = controlConfig[idx];
            return (
              <ElementHandler
                key={_id}
                onEdit={() => handleSelect(idx)}
                onRemove={() => remove(idx)}
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
