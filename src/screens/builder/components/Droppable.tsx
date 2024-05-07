"use client";

import { addComponent } from "@/lib/services/form/formSlice";
import { useAppDispatch } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { ControlTypes, IDropItemData } from "@/types";
import { ComponentProps, Ref, useId } from "react";
import { useDrop } from "react-dnd";

type Props = {
  children: React.ReactNode;
} & ComponentProps<"div">;

const acceptValues = Object.values(ControlTypes);

export default function Draggable({ children, className }: Props) {
  const dispatch = useAppDispatch();
  const [collected, drop] = useDrop<IDropItemData>({
    accept: acceptValues,
    drop: (item) => {
      dispatch(addComponent(item));
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const droppable = drop as unknown;
  return (
    <div className={cn(className)} ref={droppable as Ref<HTMLDivElement>}>
      {children}
    </div>
  );
}
