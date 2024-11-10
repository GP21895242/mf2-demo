import "./App.css";
import { createRemoteComponent } from "@module-federation/bridge-react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "@module-federation/bridge-react/router";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import Button from "./button";

init({
  name: "@demo/consumer",
  remotes: [
    {
      name: "remote1",
      entry: "http://localhost:4001/mf-manifest.json",
    },
  ],
});

// define FallbackErrorComp Component
const FallbackErrorComp = (info: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{info?.error.message}</pre>
      <button onClick={() => info.resetErrorBoundary()}>
        resetErrorBoundary(try again)
      </button>
    </div>
  );
};

// define FallbackLoading Component
const FallbackComp = <div data-test-id="loading">loading...</div>;

// use createRemoteComponent to export remote component
const Remote1App = createRemoteComponent({
  // loader is for loading remote module, for example: loadRemote('remote1/export-app')、import('remote1/export-app')
  loader: () => loadRemote("remote1/export-app"),
  // fallback 用于在加载远程模块失败时展示的组件
  // fallback is for error handling
  fallback: FallbackErrorComp,
  // loading is for loading state
  loading: FallbackComp,
});

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* <Route path="/" Component={Home} /> */}
        <Route
          path="/"
          // use Remote1App component, will be lazy loaded
          Component={() => (
            <>
              <Button />
              <Remote1App />
            </>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
