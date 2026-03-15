import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx';
import ThemeContextProvider from './context/ThemeContext.jsx';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeContextProvider>
    <HelmetProvider>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ThemeContextProvider>
);