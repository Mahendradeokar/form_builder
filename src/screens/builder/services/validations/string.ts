import { validationsType } from "@/config/formConfig";
import { ZodString, ZodType, z } from "zod";

type Noop = boolean;
export const baseStringScheme = z.string();

const isRequired = (schema: ZodString, _: Noop) =>
  schema.min(1, { message: "Required!" });

const minLength = (schema: ZodString, param: number) =>
  schema.min(param, {
    message: `Length or options selected should be more then ${param}.`,
  });

const maxLength = (schema: ZodString, param: number) =>
  schema.max(param, {
    message: `Length or options selected should be less then ${param}.`,
  });

const formateBy = (schema: ZodString, param: string) => {
  return schema.regex(new RegExp(param), {
    message: "Please provide the valid string",
  });
};

export const stringValidations = {
  [validationsType.isRequired]: isRequired,
  [validationsType.minLength]: minLength,
  [validationsType.maxLength]: maxLength,
  [validationsType.formateBy]: formateBy,
};

export type StringValidationType = typeof stringValidations;
