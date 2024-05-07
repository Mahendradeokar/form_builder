"use client";

import {
  Canvas,
  Droppable,
  ComponentHolder,
  ComponentConfiguration,
} from "@/screens/builder";
import styles from "./builder.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StoreProvider from "@/storeProvider";

export default function Builder() {
  return (
    <StoreProvider>
      <DndProvider backend={HTML5Backend}>
        <aside className={styles.sidebar}>
          <ComponentHolder />
        </aside>
        <main className={styles.mainContent}>
          <Droppable className="h-full grid place-content-center">
            <Canvas />
          </Droppable>
        </main>
      </DndProvider>
      <aside className={styles.sidebar}>
        <ComponentConfiguration />
      </aside>
    </StoreProvider>
  );
}
