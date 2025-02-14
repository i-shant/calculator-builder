import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CalculatorState } from "./types";
import { ALL_COMPONENTS } from "./lib/data";

export const useCalculatorStore = create<CalculatorState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        editorComponents: [],
        sidebarComponents: [...ALL_COMPONENTS],
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "dark" ? "light" : "dark",
          })),
        setEditorComponents: (components) =>
          set(() => ({ editorComponents: components })),
        addEditorComponent: (component) =>
          set((state) => ({
            editorComponents: [...state.editorComponents, component],
            sidebarComponents: state.sidebarComponents.filter(
              (item) => item.id !== component.id
            ),
          })),
        removeEditorComponent: (component) =>
          set((state) => ({
            editorComponents: state.editorComponents.filter(
              (item) => item.id !== component.id
            ),
            sidebarComponents: [...state.sidebarComponents, component],
          })),
      }),
      { name: "calculatorStore" }
    )
  )
);
