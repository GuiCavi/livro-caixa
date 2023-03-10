import { enableAllPlugins } from "immer";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ChargesProvider } from "./contexts/ChargesProvider";
import { FilesProvider } from "./contexts/FilesProvider";

import "./index.css";

enableAllPlugins();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FilesProvider>
      <ChargesProvider>
        <App />
      </ChargesProvider>
    </FilesProvider>
  </React.StrictMode>,
);
