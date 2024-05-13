import { Textarea } from "@/components/ui/textarea";
import { IControllerProps } from "../types";
import { ControlTypes } from "@/types";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function TextArea({
  field,
  config,
}: IControllerProps<"TextArea">) {
  return (
    <>
      <FormControl>
        <Textarea
          placeholder={config.placeholder.value}
          className="resize-none"
          {...field}
          value={String(field.value)}
        />
      </FormControl>
    </>
  );
}
