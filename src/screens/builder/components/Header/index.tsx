import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";
import PreviewBtn from "./PreviewBtn";
import SaveBtn from "./SaveBtn";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import FormName from "./FormName";

export default function Header(props: ComponentProps<"div">) {
  return (
    <header
      className={cn("p-3 flex flex-wrap justify-between", props.className)}
    >
      <FormName />
      <div className="flex justify-end flex-wrap gap-4 px-5">
        <PreviewBtn />
        <SaveBtn />
      </div>
    </header>
  );
}
