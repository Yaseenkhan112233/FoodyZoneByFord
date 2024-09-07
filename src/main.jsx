import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import { app, db } from "./Configuration.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
