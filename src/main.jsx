import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-modern-drawer/dist/index.css";
import "react-responsive-modal/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster containerStyle={{ marginTop: "72px" }} />
    </BrowserRouter>
  </React.StrictMode>,
);
