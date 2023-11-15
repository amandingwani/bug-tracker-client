import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_OAUTH_CLIENT_ID } from 'src/config/env';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
);
