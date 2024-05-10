import { Checkbox as CheckBoxScn } from "@/components/ui/checkbox";
import { IControllerProps } from "../types";
import { ControlTypes } from "@/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Fragment } from "react";
import { objectEntities } from "@/lib/utils";
import { convertComponentOptionsIntoArray } from "../services/controls";

export default function Checkbox({
  field,
  config,
}: IControllerProps<"CheckBox">) {
  const { options } = config;

  if (typeof options?.value === "string") {
    return <p>Something went wrong. Please refresh site.</p>;
  }

  let ops = convertComponentOptionsIntoArray(options!.value);
  return (
    <>
      <FormItem>
        {ops &&
          ops.map((ops) => (
            <Fragment key={ops.id}>
              <FormControl>
                <div className="flex gap-1 leading-none">
                  <CheckBoxScn
                    checked={ops.value === field.value[ops.id]}
                    onCheckedChange={(isSelected) => {
                      let checkboxState: typeof field.value = {
                        ...field.value,
                        [ops.id]: ops.value,
                      };
                      if (isSelected) {
                        field.onChange(checkboxState);
                        return;
                      }
                      delete checkboxState[ops.id];
                      field.onChange(checkboxState);
                    }}
                  />
                  <FormLabel>{ops.label}</FormLabel>
                </div>
              </FormControl>
            </Fragment>
          ))}
      </FormItem>
    </>
  );
}
