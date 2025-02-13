import { Divide, Equal, Minus, Plus, XIcon } from "lucide-react";
import { useEditorStore } from "../store";
import { Component } from "../types";
import { Link } from "react-router";
import { useState } from "react";

export default function Home() {
  const [displayValue, setDisplayValue] = useState("0");

  const { editorComponents } = useEditorStore();

  function renderComponent(item: Component) {
    switch (item.type) {
      case "display":
        return (
          <div className="col-span-full bg-orange-50 p-4 rounded text-2xl text-end shadow-sm font-semibold dark:bg-gray-600">
            {displayValue}
          </div>
        );
      case "operator":
        let icon;

        switch (item.id) {
          case "add":
            icon = <Plus className="w-5 h-5" />;
            break;
          case "subtract":
            icon = <Minus className="w-5 h-5" />;
            break;
          case "multiply":
            icon = <XIcon className="w-5 h-5" />;
            break;
          case "divide":
            icon = <Divide className="w-5 h-5" />;
            break;
          case "clear":
            icon = (
              <span className="w-5 h-5 text-lg text-center flex items-center justify-center">
                C
              </span>
            );
            break;
          case "equal":
            icon = <Equal className="w-5 h-5" />;
            break;
        }

        return (
          <button
            onClick={() => operatorClicked(item.id)}
            className="w-full flex items-center justify-center bg-cyan-100 rounded shadow p-4 cursor-pointer hover:bg-white dark:bg-gray-400 dark:hover:bg-gray-600"
          >
            {icon}
          </button>
        );
      case "number":
        return (
          <button
            onClick={() => numberClicked(parseInt(item.value))}
            className="w-full flex items-center justify-center bg-gray-100 rounded shadow-sm p-3 text-lg text-gray-600 font-semibold cursor-pointer hover:bg-white dark:opacity-80 "
          >
            {item.value}
          </button>
        );
      case "default":
        return null;
    }
  }

  function operatorClicked(op: string) {
    if (op === "clear") {
      setDisplayValue("0");
      return;
    }

    if (op === "equal") {
      setDisplayValue((prev) => eval(prev).toString());
      return;
    }

    switch (op) {
      case "add":
        setDisplayValue((prev) => prev + "+");
        break;
      case "subtract":
        setDisplayValue((prev) => prev + "-");
        break;
      case "multiply":
        setDisplayValue((prev) => prev + "*");
        break;
      case "divide":
        setDisplayValue((prev) => prev + "/");
        break;
    }
  }

  function numberClicked(num: number) {
    setDisplayValue((prev) =>
      prev === "0" ? num.toString() : prev + num.toString()
    );
  }

  return (
    <main className="p-4 text-gray-800 flex-1 dark:text-gray-100">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="p-4 m-4 w-96 border-2 border-dashed border-gray-400 rounded dark:border-gray-600">
          <div className="grid grid-cols-4 gap-2">
            {editorComponents.map((item) => (
              <div
                key={item.id}
                className={`${item.type === "display" ? "col-span-full" : ""}`}
              >
                {renderComponent(item)}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Go to the{" "}
          <Link to="/edit" className="text-black underline dark:text-white">
            Editor
          </Link>{" "}
          to edit this calculator
        </p>
      </div>
    </main>
  );
}
