import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    minify: 'esbuild', // Gunakan esbuild untuk build cepat
    cssMinify: 'lightningcss', // Kompres CSS menggunakan LightningCSS
    rollupOptions: {
      treeshake: 'recommended', // Tree Shaking untuk optimalisasi
      external: [
        '@editorjs/editorjs',  // Contoh: modul eksternal yang tidak akan di-bundle
        'firebase/app',
        'firebase/auth',
        'framer-motion',
        'axios',
        'react',
        'react-dom/client'
      ],
      output: {
        manualChunks: {
          editorJs: ['@editorjs/editorjs'],
          firebaseApp: ['firebase/app'],
          firebaseAuth: ['firebase/auth'],
          framerMotion: ['framer-motion'],
          axios: ['axios'],
          reactDom: ['react-dom/client'],
        }
      }
    }
  }
})
