import { useState } from "react";
import Sidebar from "./Sidebar";
import { Component } from "../types";

export default function Editor() {
  const [components, setComponents] = useState<Component[]>([]);

  function addComponent(newComponent: Component) {
    setComponents([...components, newComponent]);
  }

  function renderComponent(item: Component) {
    switch (item.type) {
      case "display":
        return (
          <div className="col-span-full bg-orange-50 p-4 rounded text-2xl text-end shadow-sm font-semibold">
            0
          </div>
        );
      case "operator":
        return (
          <button className="flex items-center justify-center bg-white/50 rounded shadow p-4 cursor-pointer hover:bg-white">
            {item.icon}
          </button>
        );
      case "number":
        return (
          <button className="flex items-center justify-center bg-cyan-50 rounded shadow-sm p-3 text-lg text-gray-600 font-semibold cursor-pointer hover:bg-white">
            {item.value}
          </button>
        );
      case "default":
        return null;
    }
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar handleClick={addComponent} />

      <main className="p-4 text-gray-800 flex-1">
        <h2 className="text font-bold">Editor</h2>
        <div className="w-full flex items-center justify-center">
          <div className="p-4 m-4 w-96 border-2 border-dashed border-gray-400 rounded">
            <div className="grid grid-cols-4 gap-2">
              {components.map((item) => renderComponent(item))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
