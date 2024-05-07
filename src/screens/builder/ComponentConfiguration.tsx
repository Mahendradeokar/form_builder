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
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { IFormState } from "@/types";
import { isEmpty, showMessage } from "@/lib/utils";
import { getActive } from "@/lib/services/form/controlState";

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
  const form = useForm();
  const activeIndex = useAppSelector(getActive);
  const controlsConfig = useAppSelector(selectFormControlsConfig);
  const dispatch = useAppDispatch();
  const currentControl = getFormControlByIndex(
    Number(activeIndex),
    controlsConfig
  );
  // handlers
  const handleSave: SubmitHandler<{ [field: string]: string }> = useCallback(
    (value) => {
      showMessage({
        title: "Updated Data",
        message: (
          <pre>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
      });
    },
    []
  );

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
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder={currentControl.label} {...field} />
                    </FormControl>
                    <FormDescription>Edit label...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
