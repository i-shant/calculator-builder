import { useState } from "react";
import type { Component } from "../types";
import Sidebar from "./Sidebar";
import SortableArea from "./SortableArea";

export default function Editor() {
  const [components, setComponents] = useState<Component[]>([]);

  function addComponent(newComponent: Component) {
    setComponents([...components, newComponent]);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar handleClick={addComponent} />

      <main className="p-4 text-gray-800 flex-1">
        <h2 className="text font-bold">Editor</h2>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="p-4 m-4 w-96 border-2 border-dashed border-gray-400 rounded">
            <div className="grid grid-cols-4 gap-2">
              <SortableArea
                components={components}
                setComponents={setComponents}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
