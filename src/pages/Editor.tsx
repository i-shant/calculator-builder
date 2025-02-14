import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import SortableArea from "../components/SortableArea";
import { useCalculatorStore } from "../store";
import { Redo, Undo } from "lucide-react";

export default function Editor() {
  const { undo, redo, canUndo, canRedo } = useCalculatorStore();

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar />

      <main className="p-4 text-gray-800 flex-1 dark:text-gray-100">
        <h2 className="text font-bold">Editor</h2>
        <div className="flex items-center justify-center gap-4">
          <button
            title="Undo"
            disabled={!canUndo()}
            onClick={undo}
            className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:text-gray-500"
          >
            <Undo />
          </button>
          <button
            title="Redo"
            disabled={!canRedo()}
            onClick={redo}
            className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:text-gray-500"
          >
            <Redo />
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="p-4 m-4 w-80 sm:w-96 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded">
            <div className="grid grid-cols-4 gap-2">
              <SortableArea />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Go to{" "}
            <Link to="/" className="text-black dark:text-white underline">
              Home
            </Link>{" "}
            to test this calculator
          </p>
        </div>
      </main>
    </div>
  );
}
