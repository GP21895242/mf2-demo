import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 4001,
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "classic",
      },
    }),
    pluginModuleFederation({
      name: 'react16Provider',
      exposes: {
        './export-app': './src/export-app.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});
