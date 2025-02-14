import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-8">
      <h1 className="text-4xl sm:text-6xl text-gray-800 dark:text-white font-semibold">
        404 Not Found
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
        Requested resource is unavailable
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Go back to{" "}
        <Link to="/" className="text-gray-800 dark:text-white underline">
          Home
        </Link>
      </p>
    </main>
  );
}
