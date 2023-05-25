import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Preloader from "./Components/Preloader/Preloader.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <Preloader />
      <App />
    </>
  </React.StrictMode>
);
