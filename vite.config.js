import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": "/src", // Optional alias for `src`
    },
  },
  build: {
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    rollupOptions: {
      treeshake: 'recommended',
      external: [
        "/assets/imgs/404-light.webp",
        "/assets/imgs/404-dark.webp",
        "/assets/imgs/logo-niqi.webp",
      ],
      output: {
        manualChunks: {
          editorJs: ['@editorjs/editorjs'],
          firebaseApp: ['firebase/app'],
          firebaseAuth: ['firebase/auth'],
          framerMotion: ['framer-motion'],
          axios: ['axios'],
          reactDom: ['react-dom/client'],
        },
      },
    },
    assetsInclude: ["**/*.webp"], // Explicitly include webp files
  },
});
