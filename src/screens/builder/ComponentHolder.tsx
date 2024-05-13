import { Input } from "@/components/ui/input";
import { Fragment, useId } from "react";
import Draggable from "./components/Draggable";
import { elementConfig } from "@/config";
import { controls } from "./services";

export default function ComponentHolder() {
  return (
    <div className="space-y-2">
      <h5 className="text-xl font-bold">Controls</h5>
      <div className="grid gap-2 grid-cols-2">
        {elementConfig.map(({ componentId, componentType }) => {
          return (
            <Draggable type={componentType} key={componentId}>
              {controls.renderIcon(componentType)}
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}
