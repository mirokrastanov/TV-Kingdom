import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import App from './App.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider> {/* DARK MODE CONTEXT */}
    <SearchProvider> {/* SEARCH VALUE CONTEXT */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </ThemeProvider>
)
