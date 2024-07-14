import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products-slice';
import authReducer from './auth/auth-slice';

import { themeSliceReducer } from './themeswitcher/slice.themeswitcher';

const persistAuthConfig = {
    key: 'user-token',
    storage,
    whitelist: ['accessToken', 'refreshToken'],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);


const persistThemeSwitch = {
    key: 'theme',
    storage,
};

const persistedThemeSwitcher = persistReducer(persistThemeSwitch, themeSliceReducer)


const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    products: productsReducer,
    theme: persistedThemeSwitcher,
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
