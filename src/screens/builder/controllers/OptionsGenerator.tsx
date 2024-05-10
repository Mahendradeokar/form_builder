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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { cn, generateUniqueId } from "@/lib/utils";
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
}: {
  _id: string | number;
  value: string;
  label: string;
  onTextChange: (arg: {
    id: string | number;
    value: string;
    field: keyof ControlPropertyWithOptions["value"][string | number];
  }) => void;
} & ComponentProps<"div">) => {
  const handlerChange = (
    value: string,
    field: keyof ControlPropertyWithOptions["value"][string | number]
  ) => {
    onTextChange({ id: _id, field, value: value });
  };
  return (
    <div className={cn("grid gap-2 shadow-md p-3 mt-2", className)}>
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
  field,
  config,
}: IControllerProps<"OptionsGenerator">) {
  const fieldVal = field.value as any;
  const [optionsValues, setOptionsValues] = useState(
    fieldVal as ControlPropertyWithOptions["value"]
  );
  // handlers
  const handlerAddOptions = () => {
    const uniqId = generateUniqueId();
    const entry = {
      label: "Option",
      value: "Option value",
    };

    setOptionsValues((preVal) => {
      return { ...preVal, [uniqId]: entry };
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
    const optionsVals = { ...optionsValues };
    optionsValues[id][field] = value;
    setOptionsValues(optionsVals);
  };

  const handleOnUpdate = () => {
    field.onChange(optionsValues);
  };

  let listOfOptions = convertComponentOptionsIntoArray(optionsValues);
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
              />
            );
          })}
          <Button type="button" onClick={handleOnUpdate}>
            Update Options
          </Button>
        </div>
      </>
    </FormControl>
  );
}
