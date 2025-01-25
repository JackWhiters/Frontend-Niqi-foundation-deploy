import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": "/src", // Opsional, untuk mempermudah import dari `src`
    },
  },
  build: {
    minify: "esbuild",
    cssMinify: "lightningcss",
    rollupOptions: {
      treeshake: "recommended",
      output: {
        manualChunks: {
          editorJs: ["@editorjs/editorjs"],
          firebaseApp: ["firebase/app"],
          firebaseAuth: ["firebase/auth"],
          framerMotion: ["framer-motion"],
          axios: ["axios"],
          reactDom: ["react-dom/client"],
        },
      },
    },
    // Pastikan aset seperti .webp dikenali
    assetsInclude: ["**/*.webp"],
  },
});
