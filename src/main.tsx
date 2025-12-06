import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchUser from "./search/SearchUser";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ← "/" にアクセスしたら SearchUser を表示 */}
        <Route path="/" element={<SearchUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
