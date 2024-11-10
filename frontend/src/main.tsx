import { createRoot } from "react-dom/client";
// import { StrictMode } from "react";

import { AuthContextProvider } from "./context/AuthContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  // StrictMode causes issues with socket.io //
  // <StrictMode>
  <AuthContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </AuthContextProvider>
  // </StrictMode>
);
