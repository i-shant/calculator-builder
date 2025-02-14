import { Link } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useCalculatorStore } from "../store";

export default function Header() {
  const { theme, toggleTheme } = useCalculatorStore();

  return (
    <header className="bg-white shadow dark:bg-gray-400">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-gray-100">
            <Link to="/">Calculator Builder</Link>
          </div>
          <button
            onClick={toggleTheme}
            className="cursor-pointer text-gray-800 dark:text-gray-100"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
}
