import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import './index.css';

/* No gate around the app. The store is built with the saved session already in
   it, so the first render knows whether anyone is signed in — there is nothing
   to wait for and no logged-out flash to hide. */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
