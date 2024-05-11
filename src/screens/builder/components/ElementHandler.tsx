"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/hook";
import { moveControl } from "@/lib/services/form/formSlice";
import { cn, fixedForwardRef, showToast } from "@/lib/utils";
import { Cross2Icon, MoveIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ComponentProps, ComponentPropsWithRef, ReactNode, Ref } from "react";
import { useDrag, useDrop } from "react-dnd";

interface IIconProps extends ComponentProps<"button"> {
  Icon: React.ElementType<IconProps>;
}

interface ItemSchema {
  index: number;
}

const Icons = fixedForwardRef(
  ({ Icon, ...rest }: IIconProps, ref?: Ref<HTMLButtonElement>) => {
    return (
      <Button
        size={"sm"}
        type="button"
        className="rounded p-2"
        {...rest}
        ref={ref}
      >
        <Icon width={"10"} height={10} />
      </Button>
    );
  }
);

interface Props extends ComponentProps<"div"> {
  index?: number;
  onEdit: () => void;
  onMove?: () => void;
  onRemove?: () => void;
}

const DRAG_TYPE = "CONTROL";

export default function ElementHandler({
  index,
  children,
  onEdit,
  onRemove,
  className,
}: Props) {
  const dispatch = useAppDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAG_TYPE,
    item: {
      index,
    } as ItemSchema,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [__, drop] = useDrop(() => ({
    accept: DRAG_TYPE,
    drop: (item: ItemSchema) => {
      const itemIdx = item.index;
      const currentIdx = index;

      if (currentIdx && itemIdx === currentIdx) {
        return;
      }

      dispatch(moveControl({ from: itemIdx, to: currentIdx! }));
    },
  }));

  const draggable = drag as unknown as Ref<HTMLDivElement>;
  const droppable = drop as unknown as Ref<HTMLDivElement>;
  return (
    <div
      className={cn({ "opacity-50": isDragging })}
      ref={index !== undefined ? draggable : undefined}
    >
      <div
        className={cn("relative shadow-md  rounded-sm p-4 group", className)}
        ref={index !== undefined ? droppable : undefined}
      >
        <div className="absolute top-[-10] right-0 hidden gap-2 group-hover:flex">
          <Icons Icon={MoveIcon} />
          <Icons Icon={Pencil1Icon} onClick={onEdit} />
          <Icons Icon={Cross2Icon} onClick={onRemove} />
        </div>
        {children}
      </div>
    </div>
  );
}
