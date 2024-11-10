import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  devServer: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  },

  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "rspack_provider",
    // publicPath must be configured if using manifest
    publicPath: "http://localhost:3002/",
  },
  context: __dirname,
  entry: {
    main: "./src/index.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "rspack_provider",
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
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
