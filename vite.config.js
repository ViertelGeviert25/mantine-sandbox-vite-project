import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("antd")) {
                        return "antd"; // alles aus Ant Design kommt in "antd.[hash].js"
                    }
                    // if (id.includes("node_modules")) {
                    //     return "vendor"; // alles andere aus node_modules in "vendor.[hash].js"
                    // }
                },
            },
        },
    },
});
