import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";
import PreviewBtn from "./PreviewBtn";
import SaveBtn from "./SaveBtn";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Header(props: ComponentProps<"div">) {
  return (
    <header
      className={cn("p-3 flex flex-wrap justify-between", props.className)}
    >
      <Link href={"/"}>
        <h1 className="text-xl font-bold">Form Builder</h1>
      </Link>
      <div className="flex justify-end flex-wrap gap-4 px-5">
        <PreviewBtn />

        <SaveBtn />
      </div>
    </header>
  );
}
