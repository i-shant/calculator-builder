import { Link } from "react-router";
import { useThemeStore } from "../store";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800 sm:text-2xl">
            <Link to="/">Calculator Builder</Link>
          </div>
          <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
}
