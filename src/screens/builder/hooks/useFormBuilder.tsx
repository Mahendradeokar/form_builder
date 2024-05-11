import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { removeControl, selectForm } from "@/lib/services/form/formSlice";
import { useCallback } from "react";
import {
  ArrayPath,
  FieldArray,
  FieldArrayPath,
  FieldValue,
  FieldValues,
  UseFieldArrayAppend,
  useFieldArray,
  useForm,
} from "react-hook-form";

type Values = Record<"controls", Record<string, any>[]>;

type InsertDataType<TFormData extends Values> =
  | FieldArray<TFormData, ArrayPath<TFormData>>
  | FieldArray<TFormData, ArrayPath<TFormData>>[];

export function useFormBuilder<TFormData extends Values>() {
  const formFields = useAppSelector(selectForm);

  // Hooks
  const dispatch = useAppDispatch();
  const methods = useForm<TFormData>();
  const {
    fields,
    append: appendField,
    move: moveField,
    remove: removeField,
    replace: replaceFields,
  } = useFieldArray<TFormData>({
    control: methods.control,
    name: "controls" as FieldArrayPath<TFormData>,
  });

  const append = useCallback(
    (arg: InsertDataType<TFormData>) => {
      return appendField(arg);
    },
    [appendField]
  );

  const remove = useCallback(
    (index: number) => {
      dispatch(removeControl(index));
      return removeField(index);
    },
    [removeField, dispatch]
  );

  const move = useCallback(
    ({ from, to }: { from: number; to: number }) => {
      return moveField(from, to);
    },
    [moveField]
  );

  const replace = useCallback(
    (arg: InsertDataType<TFormData>) => {
      replaceFields(arg);
    },
    [replaceFields]
  );

  return {
    arrayFields: fields,
    formMethod: methods,
    clearErrors: methods.clearErrors,
    formFields,
    append,
    replace,
    remove,
    move,
  };
}
