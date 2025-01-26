import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": "/src", // Untuk mempermudah import file dari folder `src`
    },
  },
  build: {
    minify: "esbuild", // Gunakan `esbuild` untuk build yang cepat
    cssMinify: "lightningcss", // Kompresi CSS dengan LightningCSS
    rollupOptions: {
      treeshake: "recommended", // Optimalisasi Tree Shaking
      output: {
        manualChunks: {
          // Pemisahan modul untuk bundle yang lebih efisien
          editorJs: ["@editorjs/editorjs"],
          firebaseApp: ["firebase/app"],
          firebaseAuth: ["firebase/auth"],
          framerMotion: ["framer-motion"],
          axios: ["axios"],
          reactDom: ["react-dom/client"],
        },
      },
    },
    // assetsInclude: ["**/*.webp", "**/*.png", "**/*.jpg", "**/*.svg"], // Masukkan format file tambahan jika diperlukan
  },
    server: {
    open: true, // Opsional, buka browser secara otomatis
  },
});
