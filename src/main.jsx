import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ⬅️ Changed this line
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>  {/* ⬅️ Switch from BrowserRouter to HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);