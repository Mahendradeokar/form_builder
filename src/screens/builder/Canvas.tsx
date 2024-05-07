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
import { showMessage } from "@/lib/utils";

interface Props {}

interface IItem {
  id: string;
  type: "INPUT";
}

export default function Canvas({}: Props) {
  // states
  const { name, description, controlConfig } = useAppSelector(selectForm);
  const selected = useAppSelector(getActive);

  // Hooks
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>();
  const { fields, append } = useFieldArray<FormValues>({
    control: form.control,
    name: "controls",
  });

  // handlers

  const handleSelect = useCallback(
    (identifier: string | number) => {
      dispatch(setActive(identifier));
    },
    [dispatch]
  );

  const handleFormDetailsChange = useCallback(
    (value: string | null, field: TFormDetailsSetterAllowedField) => {
      // TODO - Add validation for empty string
      dispatch(formDetailsSetter({ field, value: value ?? "" }));
    },
    [dispatch]
  );

  const submit: SubmitHandler<FormValues> = useCallback((value) => {
    showMessage({
      title: "Form Data",
      message: (
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      ),
    });
  }, []);

  // useEffects
  useEffect(() => {
    if (controlConfig.length) {
      const control = controlConfig.at(-1);
      if (control) {
        let newRecord: Omit<(typeof fields)[0], "id"> = {
          _id: control._id,
          value: "",
        };
        if (control.type === ControlTypes.CheckBox) {
          newRecord = {
            ...newRecord,
            value: {},
          };
        }
        append(newRecord);
      }
    }
  }, [controlConfig, append]);

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
          >
            {name}
          </ContentEditable>
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
          >
            {description}
          </ContentEditable>
        </ElementHandler>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
          {fields.map(({ _id }, idx: number) => {
            const current = controlConfig[idx];
            console.log("current", current);
            return (
              <ElementHandler key={_id} onEdit={() => handleSelect(idx)}>
                <FormElement
                  name={`controls.${idx}.value` as const}
                  label={current.label}
                  type={current.type}
                  options={current}
                  control={form.control}
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
