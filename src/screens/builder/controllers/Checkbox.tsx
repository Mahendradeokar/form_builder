import { Checkbox as CheckBoxScn } from "@/components/ui/checkbox";
import { IControllerProps } from "../types";
import { ControlTypes } from "@/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Fragment } from "react";

export default function Checkbox({
  field,
  config,
}: IControllerProps<ControlTypes.CheckBox>) {
  console.log("checkbox val", field.value, config.options);
  return (
    <>
      <FormItem>
        {config.options.map((ops) => (
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
