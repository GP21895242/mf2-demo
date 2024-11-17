import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 3005,
  },
  dev: {
    assetPrefix: "http://localhost:3005",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "prividerLow",
      exposes: {
        "./button": "./src/button.tsx",
        "./switch": "./src/ModeSwitch.tsx",
      },
      shared: [
        {
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
      ],
    }),
  ],
});
