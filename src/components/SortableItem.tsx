import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Component } from "../types";
import { Divide, Equal, Minus, Plus, XIcon } from "lucide-react";
import { useEditorStore, useSidebarStore } from "../store";

type Props = {
  item: Component;
};

export default function SortableItem({ item }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { addSidebarComponent } = useSidebarStore();
  const { removeEditorComponent } = useEditorStore();

  function renderComponent(item: Component) {
    switch (item.type) {
      case "display":
        return (
          <div className="col-span-full bg-orange-50 p-4 rounded text-2xl text-end shadow-sm font-semibold cursor-pointer dark:bg-gray-600">
            0
          </div>
        );
      case "operator":
        let icon;

        switch (item.id) {
          case "add":
            icon = <Plus className="w-5 h-5" />;
            break;
          case "subtract":
            icon = <Minus className="w-5 h-5" />;
            break;
          case "multiply":
            icon = <XIcon className="w-5 h-5" />;
            break;
          case "divide":
            icon = <Divide className="w-5 h-5" />;
            break;
          case "clear":
            icon = (
              <span className="w-5 h-5 text-lg text-center flex items-center justify-center">
                C
              </span>
            );
            break;
          case "equal":
            icon = <Equal className="w-5 h-5" />;
            break;
        }

        return (
          <button className="w-full flex items-center justify-center bg-cyan-100 rounded shadow p-4 cursor-pointer hover:bg-white dark:bg-gray-400 dark:hover:bg-gray-600">
            {icon}
          </button>
        );
      case "number":
        return (
          <button className="w-full flex items-center justify-center bg-gray-100 rounded shadow-sm p-3 text-lg text-gray-600 font-semibold cursor-pointer hover:bg-white dark:bg-gray-300 dark:hover:bg-gray-400 dark:hover:text-gray-100">
            {item.value}
          </button>
        );
      case "default":
        return null;
    }
  }

  function handleClick() {
    addSidebarComponent(item);
    removeEditorComponent(item.id);
  }

  return (
    <div
      className={`relative group ${isDragging ? "opacity-40" : "opacity-100"} ${
        item.type === "display" ? "col-span-full" : ""
      }`}
    >
      <button
        onClick={handleClick}
        className="absolute top-0 end-0 text-red-400 cursor-pointer rounded hover:text-white hover:bg-red-400 focus-visible:text-white focus-visible:bg-red-400 sm:hidden group-hover:block group-focus-within:block"
      >
        <XIcon className="w-4 h-4" />
      </button>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderComponent(item)}
      </div>
    </div>
  );
}
