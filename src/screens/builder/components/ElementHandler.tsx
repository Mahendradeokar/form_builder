"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn, showMessage } from "@/lib/utils";
import { Cross2Icon, MoveIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ComponentProps } from "react";

interface IIconProps extends ComponentProps<"button"> {
  Icon: React.ElementType<IconProps>;
}

const Icons = ({ Icon, ...rest }: IIconProps) => {
  return (
    <Button size={"sm"} type="button" className="rounded p-2" {...rest}>
      <Icon width={"10"} height={10} />
    </Button>
  );
};

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
  onEdit: () => void;
  onMove?: () => void;
  onRemove?: () => void;
}

export default function ElementHandler({
  children,
  onEdit,
  onMove = () => {
    showMessage();
  },
  onRemove = () => showMessage(),
  className,
}: Props) {
  return (
    <div className={cn("relative shadow-md  rounded-sm p-4 group", className)}>
      <div className="absolute top-[-10] right-0 hidden gap-2 group-hover:flex">
        <Icons Icon={MoveIcon} onClick={onMove} />
        <Icons Icon={Pencil1Icon} onClick={onEdit} />
        <Icons Icon={Cross2Icon} onClick={onRemove} />
      </div>
      {children}
    </div>
  );
}
