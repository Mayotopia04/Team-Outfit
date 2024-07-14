import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import '/node_modules/modern-normalize/modern-normalize.css';
import './index.css';
import './components/DiaryAddProductForm/react-select.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from 'components/ThemeSwitcher/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <GoogleOAuthProvider clientId="
424051864171-nssd8rqgukkpunne874lqup4akl232s6.apps.googleusercontent.com">
            <ThemeProvider>
            <App />
            </ThemeProvider>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  </React.StrictMode>
);
