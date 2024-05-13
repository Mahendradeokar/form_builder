"use client";

import { addComponent } from "@/lib/services/form/formSlice";
import { useAppDispatch } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { ControlTypes, IDropItemData } from "@/types";
import { ComponentProps, Ref, useId } from "react";
import { useDrop } from "react-dnd";
import { controlTypes } from "@/config/formConfig";
import { setActive } from "@/lib/services/form/controlState";

type Props = {
  children: React.ReactNode;
} & ComponentProps<"div">;

const acceptValues = Object.values(controlTypes);

export default function Draggable({ children, className }: Props) {
  const dispatch = useAppDispatch();
  const [_, drop] = useDrop<IDropItemData>(() => ({
    accept: acceptValues,
    drop: (item) => {
      dispatch(addComponent(item));
    },
  }));

  const droppable = drop as unknown;
  return (
    <div className={cn(className)} ref={droppable as Ref<HTMLDivElement>}>
      {children}
    </div>
  );
}
