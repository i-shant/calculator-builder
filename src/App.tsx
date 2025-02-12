import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Calculator View</>} />
        <Route path="/edit" element={<>Calculator Editor</>} />
      </Routes>
    </BrowserRouter>
  );
}
