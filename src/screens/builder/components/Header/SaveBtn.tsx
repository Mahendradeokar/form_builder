"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hook";
import { updateForm } from "@/lib/requests/form";
import { selectForm } from "@/lib/services/form/formSlice";
import { useParams } from "next/navigation";

export default function SaveBtn() {
  const form = useAppSelector(selectForm);
  const params = useParams<{ formId: string }>();
  const handleSave = async () => {
    await updateForm({ formId: params.formId, formData: form });
  };
  return (
    <div className="flex items-center gap-1">
      <Button size={"lg"} type="button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
