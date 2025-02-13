import { ALL_COMPONENTS } from "../lib/data";
import { Component } from "../types";

type Props = {
  handleClick: (newComponent: Component) => void;
};

export default function Sidebar({ handleClick }: Props) {
  return (
    <aside className="p-4 border-b sm:border-r sm:border-b-0 border-gray-300 text-gray-800">
      <h2 className="text font-bold">Components</h2>
      <div className="mt-4 grid gap-x-2 gap-y-3 grid-cols-3 sm:grid-cols-2">
        {ALL_COMPONENTS.map((item) => {
          const icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`${
                item.type === "display" ? "col-span-3 sm:col-span-2" : ""
              } flex items-center justify-center gap-1 border border-gray-300 bg-white/50 px-3 py-2 rounded shadow cursor-pointer transition-shadow hover:bg-white hover:shadow-none focus:bg-white focus:shadow-none`}
            >
              {icon}
              <span>{item.value}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
