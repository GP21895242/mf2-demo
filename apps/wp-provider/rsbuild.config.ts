import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3004,
  },
  dev: {
    assetPrefix: 'http://localhost:3004',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'federation_consumer';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'federation_consumer',
          // remotes: {
          //   federation_provider:
          //     'federation_provider@http://localhost:3000/mf-manifest.json',
          // },
          shared: [{
            react: {
              requiredVersion: "^18.3.1",
              singleton: true,
            },
            'react-dom': {
              requiredVersion: "^18.3.1",
              singleton: true,
            },
            '@emotion/styled': {
              requiredVersion: "^11.11.5",
              singleton: true,
            },
            '@emotion/react': {
              requiredVersion: "^11.11.4",
              singleton: true,
            },
            '@mui/material': {
              requiredVersion: "^5.15.19",
              singleton: true,
            }
          }],
        }),
      ]);
    },
  },
  plugins: [pluginReact()],
});