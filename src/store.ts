import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CalculatorState, EditorState } from "./types";
import { ALL_COMPONENTS } from "./lib/data";

export const useCalculatorStore = create<CalculatorState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "light",
        history: [
          {
            editorComponents: [],
            sidebarComponents: [...ALL_COMPONENTS],
          },
        ],
        historyIndex: 0,

        getCurrentState: () => {
          const { history, historyIndex } = get();
          return history[historyIndex];
        },

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "dark" ? "light" : "dark",
          })),

        updateHistory: (newState) =>
          set((state) => {
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(newState);

            return {
              history: newHistory,
              historyIndex: newHistory.length - 1,
            };
          }),

        setEditorComponents: (components) => {
          const current = get().getCurrentState();

          get().updateHistory({ ...current, editorComponents: components });
        },

        addEditorComponent: (component) => {
          const current = get().getCurrentState();
          const newState: EditorState = {
            editorComponents: [...current.editorComponents, component],
            sidebarComponents: current.sidebarComponents.filter(
              (item) => item.id !== component.id
            ),
          };

          get().updateHistory(newState);
        },

        removeEditorComponent: (component) => {
          const current = get().getCurrentState();
          const newState: EditorState = {
            editorComponents: current.editorComponents.filter(
              (item) => item.id !== component.id
            ),
            sidebarComponents: [...current.sidebarComponents, component],
          };

          get().updateHistory(newState);
        },

        canUndo: () => get().historyIndex > 0,

        canRedo: () => get().historyIndex < get().history.length - 1,

        undo: () =>
          set((state) => ({
            historyIndex: Math.max(0, state.historyIndex - 1),
          })),

        redo: () =>
          set((state) => ({
            historyIndex: Math.min(
              state.history.length - 1,
              state.historyIndex + 1
            ),
          })),
      }),
      { name: "calculatorStore" }
    )
  )
);
