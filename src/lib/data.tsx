import type { Component } from "../types";

export const ALL_COMPONENTS: Component[] = [
  { id: "display", type: "display", value: "Result Display" },
  {
    id: "add",
    type: "operator",
    value: "Add",
  },
  {
    id: "subtract",
    type: "operator",
    value: "Subtract",
  },
  {
    id: "multiply",
    type: "operator",
    value: "Multiply",
  },
  {
    id: "divide",
    type: "operator",
    value: "Divide",
  },
  {
    id: "clear",
    type: "operator",
    value: "Clear",
  },
  {
    id: "equal",
    type: "operator",
    value: "Equals",
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    type: "number",
    value: i.toString(),
  })),
] as const;
