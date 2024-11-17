import React, { useEffect } from "react";
import { init, registerRemotes } from "@module-federation/enhanced/runtime";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import useDynamicImport from "./useDynamicImport";

init({
  name: "@demo/consumer",
  remotes: [],
});

// const ProviderButton = React.lazy(() =>
//   loadRemote<React.ComponentType<any>>("@demo/provider/button")
// );

// const SwitchButton = React.lazy(() =>
//   loadRemote<React.ComponentType<any>>("@demo/provider/switch")
// );
const theme = extendTheme({});

const App = () => {
  useEffect(() => {
    registerRemotes([
      {
        name: "@demo/provider",
        entry: "http://localhost:3001/mf-manifest.json",
      },
    ]);
    registerRemotes([
      {
        name: "rspack_provider",
        entry: "http://localhost:3002/mf-manifest.json",
      },
    ]);
    registerRemotes([
      {
        name: "vite_provider",
        entry: "http://localhost:3003/remoteEntry.js",
        type: "module",
        // shareScope: "default",
      },
    ]);
    registerRemotes([
      {
        name: "wp_provider",
        entry: "http://localhost:3004/remoteEntry.js",
      },
    ]);
    registerRemotes([
      {
        name: "providerLow",
        entry: "http://localhost:3005/mf-manifest.json",
      },
    ]);
  }, []);
  const ProviderButton = useDynamicImport({
    module: "button",
    scope: "@demo/provider",
  });
  const SwitchButton = useDynamicImport({
    module: "switch",
    scope: "@demo/provider",
  });

  const RPProviderButton = useDynamicImport({
    module: "button",
    scope: "rspack_provider",
  });
  const RPSwitchButton = useDynamicImport({
    module: "switch",
    scope: "rspack_provider",
  });

  const VTProviderButton = useDynamicImport({
    module: "button",
    scope: "vite_provider",
  });
  const VTSwitchButton = useDynamicImport({
    module: "switch",
    scope: "vite_provider",
  });

  const WPProviderButton = useDynamicImport({
    module: "button",
    scope: "wp_provider",
  });
  const WPSwitchButton = useDynamicImport({
    module: "switch",
    scope: "wp_provider",
  });
  const PLProviderButton = useDynamicImport({
    module: "button",
    scope: "providerLow",
  });
  const PLSwitchButton = useDynamicImport({
    module: "switch",
    scope: "providerLow",
  });
  return (
    <CssVarProvider>
      <CssBaseline />
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <ModeSwitch />

      <p>From RsBuild</p>
      <React.Suspense>
        <ProviderButton />
      </React.Suspense>
      <React.Suspense>
        <SwitchButton />
      </React.Suspense>

      <p>From Rspack</p>
      <React.Suspense>
        <RPProviderButton />
      </React.Suspense>
      <React.Suspense>
        <RPSwitchButton />
      </React.Suspense>

      <p>From Vite</p>
      <React.Suspense>
        <VTProviderButton />
      </React.Suspense>
      <React.Suspense>
        <VTSwitchButton />
      </React.Suspense>

      <p>From Webpack</p>
      <React.Suspense>
        <WPProviderButton />
      </React.Suspense>
      <React.Suspense>
        <WPSwitchButton />
      </React.Suspense>
      <p>From Privider Low</p>
      <React.Suspense>
        <PLProviderButton />
      </React.Suspense>
      <React.Suspense>
        <PLSwitchButton />
      </React.Suspense>
    </CssVarProvider>
  );
};

export default App;
