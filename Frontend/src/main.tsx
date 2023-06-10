import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Preloader from "./Components/Preloader/Preloader.tsx";
import GameWrapper from "./Components/GameWrapper/GameWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameWrapper>
      <Preloader />
      <App />
    </GameWrapper>
  </React.StrictMode>
);
