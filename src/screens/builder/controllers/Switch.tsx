import { Switch as SwitchSC } from "@/components/ui/switch";
import { IControllerProps } from "../types";
import { FormControl, FormLabel } from "@/components/ui/form";
import { convertToNormalString } from "@/lib/utils";

export default function Switch({ field, config }: IControllerProps<"Switch">) {
  return (
    <>
      <div className="space-y-0.5">
        <FormLabel className="text-base">
          {convertToNormalString(config.label.value)}
        </FormLabel>
      </div>
      <FormControl>
        <SwitchSC
          className="ml-auto"
          checked={Boolean(field.value)}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </>
  );
}
