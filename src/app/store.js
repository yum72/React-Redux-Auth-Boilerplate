import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import { loadPersisted, startPersisting } from './persist';

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer
});

/**
 * Only auth is persisted; the list lives in persist.js. Persisting everything
 * is the usual mistake: it survives reloads you wanted and also ones you did
 * not, and it quietly makes every reducer's initial state a lie.
 *
 * Note this puts the JWT in localStorage, which is readable by any script on
 * the page. Fine for a starter; for production prefer an httpOnly cookie and
 * persist only the non-sensitive profile fields.
 */
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadPersisted()
});

startPersisting(store);
