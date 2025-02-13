import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import SortableArea from "../components/SortableArea";

export default function Editor() {
  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar />

      <main className="p-4 text-gray-800 flex-1 dark:text-gray-100">
        <h2 className="text font-bold">Editor</h2>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="p-4 m-4 w-96 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded">
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
