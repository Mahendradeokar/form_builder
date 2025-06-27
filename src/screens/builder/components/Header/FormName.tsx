"use client";

import { useAppSelector } from "@/lib/hook";
import { selectForm } from "@/lib/services/form/formSlice";

export default function FormName() {
  const form = useAppSelector(selectForm);
  return (
    <div
      className="text-xl capitalize font-bold truncate max-w-xs"
      title={form.name}
    >
      {form.name || "Loading..."}
    </div>
  );
}
