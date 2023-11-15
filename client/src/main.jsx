import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* DARK MODE CONTEXT */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
