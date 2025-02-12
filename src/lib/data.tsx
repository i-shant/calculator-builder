import { Divide, Hash, Minus, Plus, XIcon } from "lucide-react";
import type { Component } from "../types";

export const ALL_COMPONENTS: Component[] = [
  { id: "display", type: "display", value: "Result Display" },
  {
    id: "add",
    type: "operator",
    value: "Add",
    icon: <Plus className="w-4 h-4 text-gray-400" />,
  },
  {
    id: "subtract",
    type: "operator",
    value: "Subtract",
    icon: <Minus className="w-4 h-4 text-gray-400" />,
  },
  {
    id: "multiply",
    type: "operator",
    value: "Multiply",
    icon: <XIcon className="w-4 h-4 text-gray-400" />,
  },
  {
    id: "divide",
    type: "operator",
    value: "Divide",
    icon: <Divide className="w-4 h-4 text-gray-400" />,
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    type: "number",
    value: i.toString(),
    icon: <Hash className="w-3 h-3 text-gray-400" />,
  })),
] as const;
