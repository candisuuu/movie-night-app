import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin,
      scope: "read:current_user update:current_user_metadata"
    }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);