import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/web-labs/",
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      context: path.resolve(__dirname, "./src/context"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
    },
  },
});
