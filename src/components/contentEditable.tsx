"use client";

import React, { ComponentProps } from "react";
import { Input } from "./ui/input";

interface TContentEditableProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  as: React.ElementType;
  onEdit: (v: string) => void;
  isEditMode: boolean;
  value: string;
}

export default function ContentEditable({
  as: Component,
  onEdit,
  isEditMode,
  ...rest
}: TContentEditableProps) {
  return isEditMode ? (
    <Input
      {...rest}
      onChange={(e) => onEdit(e.target.value)}
      value={rest.value}
    />
  ) : (
    <Component {...rest}>{rest.value}</Component>
  );
}
