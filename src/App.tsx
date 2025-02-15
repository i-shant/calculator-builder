import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useCalculatorStore } from "./store";
import NotFound from "./pages/NotFound";

export default function App() {
  const { theme } = useCalculatorStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
