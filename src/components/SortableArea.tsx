import { useState } from "react";
import {
  closestCenter,
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
import type { Component } from "../types";
import SortableItem from "./SortableItem";

type Props = {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
};

export default function SortableArea({ components, setComponents }: Props) {
  const [active, setActive] = useState<Component | null>(null);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
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
  );
}
