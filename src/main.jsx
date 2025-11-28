import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
// ‼️ import notifications styles after core package styles
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider>
            <Notifications containerWidth={"40vw"} />
            <App />
        </MantineProvider>
    </StrictMode>
);
