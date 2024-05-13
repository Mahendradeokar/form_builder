"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectFormControlsConfig,
  updateControlConfigByIndex,
} from "@/lib/services/form/formSlice";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { ControlTypes, IFormState, InputValue, ValidationType } from "@/types";
import { ObjectValues, isEmpty, objectEntities, showToast } from "@/lib/utils";
import { getActive } from "@/lib/services/form/controlState";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { FormElement } from "./controllers";
import {
  ControlProperty,
  ControlPropertyWithOptions,
  TControlPropertiesConfig,
  ValidationConfig,
  validationProperty,
} from "@/config/types";
import { FormElementProperties } from "./types";

function getFormControlByIndex(
  idx: number,
  controlsConfig: IFormState["controlConfig"]
) {
  return controlsConfig[idx] ?? null;
}

const SweetMessage = () => {
  return <h2>Please select the element for editing!</h2>;
};

export default function ComponentConfiguration() {
  // hooks
  const activeIndex = useAppSelector(getActive);
  const dispatch = useAppDispatch();
  const {
    formFields,
    arrayFields,
    formMethod: form,
    replace,
  } = useFormBuilder<FormDataType>();
  const currentControl = getFormControlByIndex(
    Number(activeIndex),
    formFields.controlConfig
  );

  const { properties, validations } = currentControl ?? {};

  // handlers
  const handleSave: SubmitHandler<FormDataType> = useCallback(
    (value) => {
      const updatedProperties = value.controls.reduce(
        (config, prop) => {
          const { label, ...rest } = prop;
          if (isValidations(rest)) {
            config.validations[label as ValidationType] = rest;
            return config;
          }
          if (isControlPropertyWithOption(rest)) {
            config.properties.options = rest;
            return config;
          }

          config.properties[label as keyof Omit<PropertyConfig, "options">] = {
            ...rest,
            value: String(rest.value),
          };
          return config;
        },
        { properties: {}, validations: {} } as {
          properties: PropertyConfig;
          validations: ValidationConfig[ControlTypes];
        }
      );

      dispatch(
        updateControlConfigByIndex({
          idx: Number(activeIndex),
          update: { ...currentControl, ...updatedProperties },
        })
      );
    },
    [dispatch, activeIndex, currentControl]
  );

  // useEffects
  useEffect(() => {
    if (properties) {
      const fieldArr = propertiesToArrayFields({
        ...properties,
        ...validations,
      });
      replace(fieldArr);
    }
  }, [properties, validations, replace]);

  return (
    <div className="space-y-2">
      <h5 className="text-xl font-bold">Properties</h5>
      <div className="grid gap-2">
        {currentControl && !isEmpty(currentControl) ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-2"
            >
              {arrayFields.map(({ id, label, memberOf }, idx: number) => {
                const elementPropertiesConfig = {
                  ...validations,
                  ...properties,
                };
                const propertyConfig = elementPropertiesConfig[label];

                if (!propertyConfig) {
                  return null;
                }
                const { type } = propertyConfig;
                const config = transformPropertyConfig({
                  ...propertyConfig,
                  label,
                });
                return (
                  <FormElement<FormDataType>
                    key={id}
                    name={`controls.${idx}.value` as const}
                    type={type}
                    properties={config}
                    control={form.control}
                  />
                );
              })}
              <Button type="submit" size={"lg"} className="w-full">
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <SweetMessage />
        )}
      </div>
    </div>
  );
}

// Types
type PropertyConfig = TControlPropertiesConfig[ControlTypes];
type FormDataType = {
  controls: (
    | (ControlProperty<Exclude<InputValue, any[] | Record<any, any>>> & {
        label: keyof PropertyConfig;
      })
    | (ControlPropertyWithOptions & {
        label: keyof PropertyConfig;
      })
    | (validationProperty<Exclude<InputValue, any[] | Record<any, any>>> & {
        label: ValidationType;
      })
  )[];
};

type propertiesToArrayFieldsReturnType = (
  | (ControlProperty<Exclude<InputValue, any[] | Record<any, any>>> & {
      label: keyof PropertyConfig;
    })
  | (ControlPropertyWithOptions & {
      label: keyof PropertyConfig;
    })
  | (validationProperty<Exclude<InputValue, any[] | Record<any, any>>> & {
      label: ValidationType;
    })
)[];

// Helpers
const propertiesToArrayFields = <
  TData extends PropertyConfig & ValidationConfig[ControlTypes]
>(
  obj: TData
): propertiesToArrayFieldsReturnType => {
  const arrayData = objectEntities(obj).map(([label, values]) => {
    if (values) {
      return {
        ...values,
        label,
      } as propertiesToArrayFieldsReturnType[number];
    }
    return null;
  });

  return arrayData.filter(Boolean);
};

const transformPropertyConfig = (
  config: (
    | ControlProperty<InputValue>
    | ControlPropertyWithOptions
    | validationProperty<InputValue>
  ) & { label: ValidationType | keyof PropertyConfig }
): FormElementProperties => {
  let placeholder = "Enter....";
  let options = undefined;

  if (isControlPropertyWithOption(config)) {
    options = config.value;
  } else if (!isValidations(config)) {
    placeholder = String(config.value);
  }
  const baseProp = {
    type: "Text" as const,
    memberOf: config.memberOf,
  };
  return {
    label: {
      ...baseProp,
      value: config.label,
    },
    placeholder: {
      ...baseProp,
      value: placeholder,
    },
    description: { ...baseProp, value: "" },
    options: options
      ? {
          ...baseProp,
          memberOf: "properties",
          value: options,
          type: "DropDown",
        }
      : undefined,
  };
};

const isControlPropertyWithOption = (
  options: ControlProperty | ControlPropertyWithOptions | validationProperty
): options is ControlPropertyWithOptions => {
  return typeof options.value === "object";
};

const isValidations = (
  options: ControlProperty | ControlPropertyWithOptions | validationProperty
): options is validationProperty => {
  return options.memberOf === "validations";
};
