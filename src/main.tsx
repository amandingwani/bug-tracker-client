import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_OAUTH_CLIENT_ID } from 'src/config/env';
import App from './App';
import { store } from 'src/redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </GoogleOAuthProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
