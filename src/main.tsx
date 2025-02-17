import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/themecontext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
