import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Editor from "./components/Editor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<>Calculator View</>} />
          <Route path="/edit" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
