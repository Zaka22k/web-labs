import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      context: path.resolve(__dirname, "./src/context"),
      components: path.resolve(__dirname, "./src/components"),
      layout: path.resolve(__dirname, "./src/layout"),
      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
});
