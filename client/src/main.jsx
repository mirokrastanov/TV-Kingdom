import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider> {/* DARK MODE CONTEXT */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
