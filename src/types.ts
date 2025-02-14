export type Component = {
  id: string;
  type: string;
  value: string;
};

export type Theme = "dark" | "light";

export type CalculatorState = {
  theme: Theme;
  editorComponents: Component[];
  sidebarComponents: Component[];
  toggleTheme: () => void;
  setEditorComponents: (components: Component[]) => void;
  addEditorComponent: (newComponents: Component) => void;
  removeEditorComponent: (component: Component) => void;
};
