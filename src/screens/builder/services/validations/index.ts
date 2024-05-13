import { defaultValidations, validationsType } from "@/config/formConfig";
import { ControlTypes, ValidationType } from "@/types";
import { baseStringScheme, stringValidations } from "./string";
import { ValidationConfig } from "@/config/types";
import {
  isArrayType,
  isObject,
  isPrimitive,
  objectEntities,
} from "@/lib/utils";
import { baseObjectSchema, objectValidation } from "./object";
import { ZodAny, ZodEffects, ZodString, z } from "zod";

export const getDefaultValidations = (type: ControlTypes) => {
  return structuredClone(defaultValidations[type]);
};

export const getApplicableValidations = (
  validation: ValidationConfig[ControlTypes]
) => {
  const entries = objectEntities(validation).filter(([type, param]) => {
    if (isPrimitive(param?.value)) {
      return Boolean(param?.value);
    }
    if (isArrayType(param?.value)) {
      return Boolean(param?.value.length);
    }

    if (isObject(param?.value)) {
      return Boolean(Object.keys(param?.value).length);
    }

    return false;
  });

  return Object.fromEntries(entries);
};

export const getValidations = (
  validations: ValidationConfig[ControlTypes],
  validationType: "object" | "string"
) => {
  if (validationType === "string") {
    const rc = objectEntities(validations).reduce((schema, [type, param]) => {
      const validator = stringValidations[type];
      return validator(schema, param?.value as never);
    }, baseStringScheme);

    return rc;
  }

  if (validationType === "object") {
    const rc = objectEntities(validations).reduce((schema, [type, param]) => {
      const validator = objectValidation[type];
      return validator(schema, param?.value as never);
    }, baseObjectSchema as ZodEffects<any>);

    return rc;
  }

  return z.any();
};
