import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import type { Component, Theme } from "./types";
import { ALL_COMPONENTS } from "./lib/data";

export const useThemeStore = create(
  persist(
    combine({ theme: "light" as Theme }, (set) => ({
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    })),
    { name: "theme-storage" }
  )
);

export const useEditorStore = create(
  persist(
    combine(
      { editorComponentsHistory: [[]] as Component[][], historyIndex: 0 },
      (set) => ({
        // get editorComponents() {
        //   return get()?.editorComponentsHistory[get()?.historyIndex] ?? [];
        // },

        // get canUndo() {
        //   console.log("get:", get());
        //   return get()?.historyIndex > 0;
        // },

        // get canRedo() {
        //   return (
        //     get()?.historyIndex < get()?.editorComponentsHistory.length - 1
        //   );
        // },

        setEditorComponents: (components: Component[]) => {
          set((state) => {
            const newHistory = [
              ...state.editorComponentsHistory.slice(0, state.historyIndex + 1),
              components,
            ];
            return {
              editorComponentsHistory: newHistory,
              historyIndex: newHistory.length - 1,
            };
          });
        },

        addEditorComponent: (newComponent: Component) => {
          set((state) => {
            const editorComponents =
              state.editorComponentsHistory[state.historyIndex] ?? [];
            // console.log(editorComponents);
            const updatedComponents = [...editorComponents, newComponent];
            const newHistory = [
              ...state.editorComponentsHistory.slice(0, state.historyIndex + 1),
              updatedComponents,
            ];
            return {
              editorComponentsHistory: newHistory,
              historyIndex: newHistory.length - 1,
            };
          });
        },

        removeEditorComponent: (id: string) => {
          set((state) => {
            const editorComponents =
              state.editorComponentsHistory[state.historyIndex] ?? [];
            const updatedComponents = editorComponents.filter(
              (item) => item.id !== id
            );
            const newHistory = [
              ...state.editorComponentsHistory.slice(0, state.historyIndex + 1),
              updatedComponents,
            ];
            return {
              editorComponentsHistory: newHistory,
              historyIndex: newHistory.length - 1,
            };
          });
        },

        undo: () => {
          set((state) => ({
            historyIndex: Math.max(0, state.historyIndex - 1),
          }));
        },

        redo: () => {
          set((state) => ({
            historyIndex: Math.min(
              state.editorComponentsHistory.length - 1,
              state.historyIndex + 1
            ),
          }));
        },
      })
    ),
    {
      name: "editor-storage",
    }
  )
);

// export const useEditorStore = create(
//   persist(
//     combine({ editorComponents: <Component[]>[] }, (set) => ({
//       setEditorComponents: (components: Component[]) =>
//         set(() => ({ editorComponents: components })),
//       addEditorComponent: (newComponent: Component) =>
//         set((state) => ({
//           editorComponents: [...state.editorComponents, newComponent],
//         })),
//       removeEditorComponent: (id: string) =>
//         set((state) => ({
//           editorComponents: state.editorComponents.filter(
//             (item) => item.id !== id
//           ),
//         })),
//     })),
//     {
//       name: "editor-storage",
//     }
//   )
// );

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
