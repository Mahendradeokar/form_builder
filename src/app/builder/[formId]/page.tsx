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
  }, [dispatch]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {!isPreview && (
          <aside className={styles.sidebar}>
            <ComponentHolder />
          </aside>
        )}
        <main className={styles.mainContent}>
          <Droppable className="h-full grid place-content-center">
            {loading ? <Loader /> : <Canvas />}
          </Droppable>
        </main>
      </DndProvider>
      {!isPreview && (
        <aside className={styles.sidebar}>
          <ComponentConfiguration />
        </aside>
      )}
    </>
  );
}
