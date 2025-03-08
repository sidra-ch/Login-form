import { defineConfig } from "vite";
import path from "path"; // Import the path module

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Map "@" to the "src" directory
    },
  },
});
