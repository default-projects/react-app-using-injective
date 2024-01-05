import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), nodePolyfills({ protocolImports: true })],
    server: {
      host: "localhost",
      port: env.VITE_PORT || 3000,
    },
  }
})