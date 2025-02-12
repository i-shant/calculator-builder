import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<>Calculator View</>} />
          <Route path="/edit" element={<>Calculator Editor</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
