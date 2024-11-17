import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { init } from '@module-federation/enhanced/runtime';
import { customSharedPlugin } from '../mf-plugin';

init({
  name: '@demo/provider',
  plugins: [customSharedPlugin()],
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
