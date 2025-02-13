import { useState } from "react";
import Sidebar from "./Sidebar";
import { Component } from "../types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function Editor() {
  const [components, setComponents] = useState<Component[]>([]);
  const [active, setActive] = useState<Component | null>(null);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  function addComponent(newComponent: Component) {
    setComponents([...components, newComponent]);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActive(components.find((item) => item.id === active.id) ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActive(null);
  }

  function handleDragCancel() {
    setActive(null);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar handleClick={addComponent} />

      <main className="p-4 text-gray-800 flex-1">
        <h2 className="text font-bold">Editor</h2>
        <div className="w-full flex items-center justify-center">
          <div className="p-4 m-4 w-96 border-2 border-dashed border-gray-400 rounded">
            <div className="grid grid-cols-4 gap-2">
              <DndContext
                sensors={sensors}
                // collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <SortableContext
                  items={components.map((_, idx) => idx)}
                  strategy={rectSortingStrategy}
                >
                  {components.map((item) => (
                    <SortableItem key={item.id} item={item} />
                  ))}
                </SortableContext>

                <DragOverlay adjustScale>
                  {active ? <SortableItem item={active} /> : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
