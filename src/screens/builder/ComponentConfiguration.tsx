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
import { ControlTypes, IFormState } from "@/types";
import { ObjectValues, isEmpty, objectEntities, showToast } from "@/lib/utils";
import { getActive } from "@/lib/services/form/controlState";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { FormElement } from "./controllers";
import {
  ControlProperty,
  ControlPropertyWithOptions,
  TControlPropertiesConfig,
} from "@/config/types";

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

  const { properties } = currentControl ?? {};

  // handlers
  const handleSave: SubmitHandler<FormDataType> = useCallback(
    (value) => {
      const updatedProperties = value.controls.reduce((properties, prop) => {
        const { label, ...rest } = prop;
        if (isControlProperty(rest) && label !== "options") {
          properties[label] = { ...rest };
          return properties;
        }

        properties.options = { ...rest } as ControlPropertyWithOptions;
        return properties;
      }, {} as PropertyConfig);

      dispatch(
        updateControlConfigByIndex({
          idx: Number(activeIndex),
          update: { ...currentControl, properties: updatedProperties },
        })
      );
    },
    [dispatch, activeIndex, currentControl]
  );

  // useEffects
  useEffect(() => {
    if (properties) {
      const fieldArr = propertiesToArrayFields(properties);
      replace(fieldArr);
    }
  }, [properties, replace]);

  return (
    <div className="space-y-2">
      <h5 className="text-xl font-bold">Component&apos;s Properties</h5>
      <div className="grid gap-2">
        {currentControl && !isEmpty(currentControl) ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-2"
            >
              {arrayFields.map(({ id, value, label }, idx: number) => {
                const propertyConfig = properties[label];
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

type PropertyConfig = TControlPropertiesConfig[ControlTypes];
type FormDataType = {
  controls: (
    | (ControlProperty & { label: keyof PropertyConfig })
    | (ControlPropertyWithOptions & {
        label: keyof PropertyConfig;
      })
  )[];
};

type PropertiesExtraFields = { label: keyof PropertyConfig };
type propertiesToArrayFieldsReturnType = (
  | (ControlProperty & PropertiesExtraFields)
  | (ControlPropertyWithOptions & PropertiesExtraFields)
)[];

const propertiesToArrayFields = <TData extends PropertyConfig = PropertyConfig>(
  obj: TData
): propertiesToArrayFieldsReturnType => {
  const arrayData = objectEntities(obj).map(([label, values]) => {
    if (values) {
      if (!isControlProperty(values)) {
        return {
          ...values,
          label,
        } as ControlPropertyWithOptions & PropertiesExtraFields;
      }
      return {
        ...values,
        label,
      } as ControlProperty & PropertiesExtraFields;
    }
    return null;
  });

  return arrayData.filter(Boolean);
};

const transformPropertyConfig = (
  config:
    | (ControlProperty & PropertiesExtraFields)
    | (ControlPropertyWithOptions & PropertiesExtraFields)
): PropertyConfig => {
  let placeholder = "";
  let options = undefined;

  if (isControlProperty(config)) {
    placeholder = config.value;
  } else {
    options = config.value;
  }
  return {
    label: { value: config.label, type: "Text", isVisible: true },
    placeholder: {
      value: placeholder,
      type: "Text",
      isVisible: true,
    },
    description: { value: "", type: "Text", isVisible: true },
    options: options
      ? { value: options, isVisible: true, type: "DropDown" }
      : undefined,
  };
};

const isControlProperty = (
  options: ControlProperty | ControlPropertyWithOptions
): options is ControlProperty => {
  return typeof options.value === "string";
};
