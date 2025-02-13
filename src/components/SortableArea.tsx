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
import { useEditorStore } from "../store";

export default function SortableArea() {
  const [active, setActive] = useState<Component | null>(null);

  const { setEditorComponents, editorComponentsHistory, historyIndex } =
    useEditorStore();

  const editorComponents = editorComponentsHistory[historyIndex] ?? [];

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActive(editorComponents.find((item) => item.id === active.id) ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = editorComponents.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = editorComponents.findIndex(
        (item) => item.id === over?.id
      );

      setEditorComponents(arrayMove(editorComponents, oldIndex, newIndex));
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
        items={editorComponents.map((_, idx) => idx)}
        strategy={rectSortingStrategy}
      >
        {editorComponents?.length
          ? editorComponents.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))
          : null}
      </SortableContext>

      <DragOverlay adjustScale>
        {active ? <SortableItem item={active} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
