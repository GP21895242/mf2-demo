import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3003,
    hmr: false, // disable hot module reload to integrate with webpack
  },
  base: "http://localhost:3003",
  plugins: [
    federation({
      name: "vite_provider",
      filename: 'remoteEntry.js',
      manifest: true,
      remotes: {},
      exposes: {
        "./button": "./src/button.tsx",
        "./switch": "./src/ModeSwitch.tsx",
      },
      shared: {
        react: {
          requiredVersion: "^18.3.1",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "^18.3.1",
          singleton: true,
        },
        "@emotion/styled": {
          requiredVersion: "^11.11.5",
          singleton: true,
        },
        "@emotion/react": {
          requiredVersion: "^11.11.4",
          singleton: true,
        },
        "@mui/material": {
          requiredVersion: "^5.15.19",
          singleton: true,
        },
      },
    }),
    react(),
    
  ],
});
