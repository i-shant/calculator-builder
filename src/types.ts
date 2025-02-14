export type Component = {
  id: string;
  type: string;
  value: string;
};

export type EditorState = {
  editorComponents: Component[];
  sidebarComponents: Component[];
};

export type CalculatorState = {
  theme: "light" | "dark";
  history: EditorState[];
  historyIndex: number;
  toggleTheme: () => void;
  getCurrentState: () => EditorState;
  updateHistory: (newState: EditorState) => void;
  setEditorComponents: (components: Component[]) => void;
  addEditorComponent: (component: Component) => void;
  removeEditorComponent: (component: Component) => void;
  undo: () => void;
  redo: () => void;
};
