import { Input } from "@/components/ui/input";
import { ComponentProps, useCallback, useState } from "react";
import { IControllerProps } from "../types";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn, generateUniqueId, showToast } from "@/lib/utils";
import { ControlPropertyWithOptions } from "@/config/types";
import { convertComponentOptionsIntoArray } from "../services/controls";
import { EventFor } from "@/types";
import { Numans } from "next/font/google";

const Option = ({
  _id,
  value,
  label,
  className,
  onTextChange,
  onRemove,
  isRemovable,
}: {
  _id: string | number;
  value: string;
  label: string;
  isRemovable: boolean;
  onTextChange: (arg: {
    id: string | number;
    value: string;
    field: keyof ControlPropertyWithOptions["value"][string | number];
  }) => void;
  onRemove: (id: string | number) => void;
} & ComponentProps<"div">) => {
  const handlerChange = (
    value: string,
    field: keyof ControlPropertyWithOptions["value"][string | number]
  ) => {
    onTextChange({ id: _id, field, value: value });
  };
  return (
    <div className={cn("grid gap-2 shadow-md p-3 mt-2 relative", className)}>
      {isRemovable && (
        <div
          className="absolute top-[10px] right-0"
          onClick={() => onRemove(_id)}
        >
          <Cross2Icon width={15} height={15} />
        </div>
      )}
      <label>Label</label>
      <Input
        onChange={(e) => handlerChange(e.target.value, "label")}
        value={label}
      />

      <label>Value</label>
      <Input
        onChange={(e) => handlerChange(e.target.value, "value")}
        value={value}
      />
    </div>
  );
};

export default function OptionsGenerator({
  field: formField,
  config,
}: IControllerProps<"OptionsGenerator">) {
  const fieldVal = formField.value as any;

  // handlers
  const handlerAddOptions = () => {
    const uniqId = generateUniqueId();
    const entry = {
      label: "Option",
      value: "Option value",
    };

    formField.onChange({
      ...(fieldVal as ControlPropertyWithOptions["value"]),
      [uniqId]: entry,
    });
  };

  const handleOnChange = ({
    id,
    field,
    value,
  }: {
    id: string | number;
    field: keyof ControlPropertyWithOptions["value"][string | number];
    value: string;
  }) => {
    const optionsVals = { ...fieldVal } as ControlPropertyWithOptions["value"];
    optionsVals[id][field] = value;
    formField.onChange(optionsVals);
  };

  const handleRemove = (id: string | number) => {
    const clone = { ...fieldVal } as ControlPropertyWithOptions["value"];
    if (Object.keys(clone).length > 1) {
      delete clone[id];
      formField.onChange(clone);
    }
  };

  let listOfOptions = convertComponentOptionsIntoArray(fieldVal);
  return (
    <FormControl>
      <>
        <div className="flex justify-between mt-3 gap-2 items-center">
          <label>Add Options</label>
          <Button
            type="button"
            className="flex gap-1"
            onClick={handlerAddOptions}
          >
            <PlusCircledIcon width={15} height={15} />
            Add
          </Button>
        </div>
        <div>
          {listOfOptions.map((prop) => {
            return (
              <Option
                _id={prop.id}
                value={prop.value}
                label={prop.label}
                key={prop.id}
                onTextChange={handleOnChange}
                onRemove={handleRemove}
                isRemovable={listOfOptions.length > 1}
              />
            );
          })}
        </div>
      </>
    </FormControl>
  );
}
