import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PtContextProvider } from "./context/PtContext";
import "./style.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PtContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PtContextProvider>
);
