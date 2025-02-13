import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import type { Component } from "./types";
import { ALL_COMPONENTS } from "./lib/data";

export const useEditorStore = create(
  persist(
    combine({ editorComponents: <Component[]>[] }, (set) => ({
      setEditorComponents: (components: Component[]) =>
        set(() => ({ editorComponents: components })),
      addEditorComponent: (newComponent: Component) =>
        set((state) => ({
          editorComponents: [...state.editorComponents, newComponent],
        })),
      removeEditorComponent: (id: string) =>
        set((state) => ({
          editorComponents: state.editorComponents.filter(
            (item) => item.id !== id
          ),
        })),
    })),
    {
      name: "editor-storage",
    }
  )
);

export const useSidebarStore = create(
  persist(
    combine({ sidebarComponents: [...ALL_COMPONENTS] }, (set) => ({
      addSidebarComponent: (newComponent: Component) =>
        set((state) => ({
          sidebarComponents: [...state.sidebarComponents, newComponent],
        })),
      removeSidebarComponent: (id: string) =>
        set((state) => ({
          sidebarComponents: state.sidebarComponents.filter(
            (item) => item.id !== id
          ),
        })),
    })),
    {
      name: "sidebar-storage",
    }
  )
);
