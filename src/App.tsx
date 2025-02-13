import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Editor from "./pages/Editor";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
