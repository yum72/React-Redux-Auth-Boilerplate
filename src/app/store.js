import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer
});

/**
 * Only auth is persisted. Persisting everything is the usual mistake: it
 * survives reloads you wanted and also ones you did not, and it quietly makes
 * every reducer's initial state a lie.
 *
 * Note this puts the JWT in localStorage, which is readable by any script on
 * the page. Fine for a starter; for production prefer an httpOnly cookie and
 * persist only the non-sensitive profile fields.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches these with non-serializable payloads.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
