import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Component } from "../types";
import { Divide, Minus, Plus, XIcon } from "lucide-react";

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
    gridColumn: `${item.type === "display" ? "1 / -1" : "span 1"}`,
    opacity: isDragging ? "0.5" : "1",
  };

  function renderComponent(item: Component) {
    switch (item.type) {
      case "display":
        return (
          <div className="col-span-full bg-orange-50 p-4 rounded text-2xl text-end shadow-sm font-semibold cursor-pointer">
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
        }

        return (
          <button className="w-full flex items-center justify-center bg-cyan-100 rounded shadow p-4 cursor-pointer hover:bg-white">
            {icon}
          </button>
        );
      case "number":
        return (
          <button className="w-full flex items-center justify-center bg-gray-100 rounded shadow-sm p-3 text-lg text-gray-600 font-semibold cursor-pointer hover:bg-white">
            {item.value}
          </button>
        );
      case "default":
        return null;
    }
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {renderComponent(item)}
    </div>
  );
}
