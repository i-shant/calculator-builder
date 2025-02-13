import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Component } from "../types";

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
          <div className="col-span-full bg-orange-50 p-4 rounded text-2xl text-end shadow-sm font-semibold">
            0
          </div>
        );
      case "operator":
        return (
          <button className="w-full flex items-center justify-center bg-white/50 rounded shadow p-4 cursor-pointer hover:bg-white">
            {item.icon}
          </button>
        );
      case "number":
        return (
          <button className="w-full flex items-center justify-center bg-cyan-50 rounded shadow-sm p-3 text-lg text-gray-600 font-semibold cursor-pointer hover:bg-white">
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
