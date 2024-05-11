import { validationsType } from "@/config/formConfig";
import { ZodAny, ZodEffects, ZodObject, boolean, z } from "zod";

type Noop = boolean;
export const baseObjectSchema = z
  .record(z.string(), z.string())
  .refine(Boolean);
type SchemaType = ZodEffects<any>;

const isRequired = (schema: SchemaType, _: Noop): ZodEffects<any> =>
  schema.refine((val) => Object.keys(val).length > 0, { message: "Required!" });

const minLength = (schema: SchemaType, param: number): ZodEffects<any> =>
  schema.refine((val) => Object.keys(val).length >= param, {
    message: `Length or options selected should be more then ${param}.`,
  });

const maxLength = (schema: SchemaType, param: number): ZodEffects<any> =>
  schema.refine((val) => Object.keys(val).length <= param, {
    message: `Length or options selected should be less then ${param}.`,
  });

const formateBy = (schema: SchemaType, _: Noop): ZodEffects<any> =>
  schema.refine(Boolean);

export const objectValidation = {
  [validationsType.isRequired]: isRequired,
  [validationsType.minLength]: minLength,
  [validationsType.maxLength]: maxLength,
  [validationsType.formateBy]: formateBy,
};

export type ObjectValidationType = typeof objectValidation;
