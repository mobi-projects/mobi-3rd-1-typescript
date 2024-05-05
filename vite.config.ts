import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/aladin": {
        target: "http://www.aladin.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aladin/, ""),
        secure: true,
        ws: false,
      },
    },
  },
})
