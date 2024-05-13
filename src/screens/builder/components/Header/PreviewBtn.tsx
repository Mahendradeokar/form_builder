"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Switch } from "../../../../components/ui/switch";

export default function PreviewBtn() {
  const [isPreview, setPreview] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const params = useSearchParams();
  const preview = params.get("preview");

  const handlePreview = (isSwitched: boolean) => {
    let path = currentPath;
    if (!preview) {
      path += "?preview=true";
    }
    router.push(path);
    setPreview(isSwitched);
  };
  return (
    <div className="flex items-center gap-2">
      <label>Preview</label>
      <Switch checked={isPreview} onCheckedChange={handlePreview} />
    </div>
  );
}
