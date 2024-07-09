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
import { ThemeProvider } from 'components/ThemeSwitcher/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
          </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
