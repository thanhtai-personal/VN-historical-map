import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
    },
  },
  build: {
    rollupOptions: {
      external: [/\.json$/], // explicitly externalize JSON files
    },
  },
  plugins: [react()],
})
