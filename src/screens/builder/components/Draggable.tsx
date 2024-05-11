"use client";

import { IDropItemData, ControlTypes } from "@/types";
import { Ref, useId } from "react";
import { useDrag } from "react-dnd";

interface Props {
  children: React.ReactNode;
  type: ControlTypes;
}

export default function Draggable({ children, type }: Props) {
  const [collected, drag] = useDrag<IDropItemData>(() => ({
    type: type,
    item: { type },
  }));

  const draggable = drag as unknown;
  return <div ref={draggable as Ref<HTMLDivElement>}>{children}</div>;
}
