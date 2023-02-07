import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./context/authContext";
import { DarkModeContentProvider } from "./context/darkModeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeContentProvider>
    <UserContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserContextProvider>
  </DarkModeContentProvider>
);
