"use client";

import React, { ComponentProps } from "react";
import { Input } from "./ui/input";

interface TContentEditableProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  as: React.ElementType;
  onEdit: (v: string) => void;
  children: string;
  isEditMode: boolean;
}

export default function ContentEditable({
  as: Component,
  onEdit,
  children,
  isEditMode,
  ...rest
}: TContentEditableProps) {
  return isEditMode ? (
    <Input
      {...rest}
      onChange={(e) => onEdit(e.target.value)}
      value={children}
    />
  ) : (
    <Component {...rest}>{children}</Component>
  );
}
