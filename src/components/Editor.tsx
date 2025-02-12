import Sidebar from "./Sidebar";

export default function Editor() {
  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-2">
      <Sidebar />
      <main>main</main>
    </div>
  );
}
