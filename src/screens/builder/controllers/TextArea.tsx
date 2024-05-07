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
}: IControllerProps<ControlTypes.TextArea>) {
  return (
    <>
      <FormControl>
        <Textarea
          placeholder={config.placeholder}
          className="resize-none"
          {...field}
        />
      </FormControl>
    </>
  );
}
