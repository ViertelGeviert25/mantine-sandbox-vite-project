import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import NotifyCenter from "./NotifyCenter.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider>
            <ModalsProvider>
                <Notifications containerWidth={"40vw"} />
                <NotifyCenter />
            </ModalsProvider>
        </MantineProvider>
    </StrictMode>
);
