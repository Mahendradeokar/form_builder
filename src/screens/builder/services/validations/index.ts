import { defaultValidations, validationsType } from "@/config/formConfig";
import { ControlTypes, ValidationType } from "@/types";
import { baseStringScheme, stringValidations } from "./string";
import { ValidationConfig } from "@/config/types";
import { objectEntities } from "@/lib/utils";
import { baseObjectSchema, objectValidation } from "./object";
import { ZodAny, ZodEffects, ZodString, z } from "zod";

export const getDefaultValidations = (type: ControlTypes) => {
  return structuredClone(defaultValidations[type]);
};

export const getValidations = (
  validations: ValidationConfig[ControlTypes],
  validationType: "object" | "string"
) => {
  if (validationType === "string") {
    const rc = objectEntities(validations).reduce((schema, [type, param]) => {
      return stringValidations[type](schema, param as any);
    }, baseStringScheme);

    return rc;
  }

  if (validationType === "object") {
    const rc = objectEntities(validations).reduce((schema, [type, param]) => {
      return objectValidation[type](schema, param as any);
    }, baseObjectSchema as ZodEffects<any>);

    return rc;
  }

  return z.any();
};
