import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col dark:bg-gray-800">
      <Header />
      <Outlet />
    </div>
  );
}
