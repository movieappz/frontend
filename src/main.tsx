import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useUserStore } from "./store/userStore";

// Initialize auth on app start
const { initializeAuth } = useUserStore.getState();
initializeAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
);
