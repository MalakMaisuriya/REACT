import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

// Use createWebStorage for Vite ESM compatibility
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (...args) => Promise.resolve(args[1]),
  removeItem: () => Promise.resolve(),
});

const storage =
  typeof window !== 'undefined'
    ? window.localStorage
      ? {
          getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
          setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
          removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
        }
      : createNoopStorage()
    : createNoopStorage();
import authReducer from './authSlice';

const persistConfig = {
  key: 'zomato-partner',
  storage,
  whitelist: ['auth'], // only persist auth
  transforms: [
    createTransform(
      (inboundState) => ({
        user: inboundState.user,
        token: inboundState.token,
      }),
      (outboundState) => ({
        user: outboundState?.user ?? null,
        token: outboundState?.token ?? null,
        loading: false,
        error: null,
      }),
      { whitelist: ['auth'] }
    ),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
