import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800 sm:text-2xl">
            <Link to="/">Calculator Builder</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
