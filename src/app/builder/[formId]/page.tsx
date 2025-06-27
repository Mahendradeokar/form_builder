"use client";

import {
  Canvas,
  Droppable,
  ComponentHolder,
  ComponentConfiguration,
} from "@/screens/builder";
import styles from "./page.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StoreProvider from "@/storeProvider";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getForm } from "@/lib/requests/form";
import { useDispatch } from "react-redux";
import { loadForm } from "@/lib/services/form/formSlice";
import { IFormState } from "@/types";
import Loader from "@/components/ui/Loader";
import { useAppDispatch } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type CanvasAside = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

const CanvasAside: React.FC<CanvasAside> = ({ children, className }) => {
  return (
    <aside
      className={cn(
        "hidden xl:block max-h-full overflow-hidden overflow-y-auto p-4",
        className
      )}
    >
      {children}
    </aside>
  );
};

export default function Builder() {
  const [loading, setLoading] = useState(true);
  const searchParam = useSearchParams();
  const param = useParams<{ formId: string }>();
  const isPreview = searchParam.get("preview");
  const formId = param.formId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, isSuccess } = await getForm(formId);
      if (isSuccess) {
        const formData = (data as any)[0]?.formData as IFormState | undefined;
        if (formData) {
          dispatch(loadForm((data as any)[0].formData));
        }
      }
      setLoading(false);
    })();
  }, [dispatch, formId]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {!isPreview && (
          <CanvasAside>
            <ComponentHolder />
          </CanvasAside>
        )}
        <ScrollArea
          type="always"
          className="bg-secondary flex justify-center max-h-full"
        >
          <Droppable className="w-full flex place-content-center">
            {loading ? <Loader /> : <Canvas preview={Boolean(isPreview)} />}
          </Droppable>
          <ScrollBar />
        </ScrollArea>
      </DndProvider>
      {!isPreview && (
        <CanvasAside>
          <ComponentConfiguration />
        </CanvasAside>
      )}
    </>
  );
}
