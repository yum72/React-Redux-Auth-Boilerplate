const STORAGE_KEY = 'auth-boilerplate.state';
const PERSISTED_SLICES = ['auth'];
const WRITE_DELAY_MS = 150;

/**
 * Reads the saved slices, for use as the store's preloadedState.
 *
 * Synchronous on purpose. This is a client-rendered app, so the store is built
 * before the first render and the very first paint already knows whether there
 * is a session. That removes the flash of logged-out UI, and the redirect that
 * used to fire from protected routes before the token was restored, without
 * needing a gate component to hold rendering back.
 *
 * Returns undefined rather than throwing on anything unexpected: storage can be
 * unavailable in private windows or embedded contexts, and the stored value can
 * be left over from an older shape of the app. configureStore treats undefined
 * as "no preloaded state", which is exactly the wanted fallback.
 */
export function loadPersisted() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return undefined;

    const state = {};
    for (const slice of PERSISTED_SLICES) {
      if (parsed[slice] && typeof parsed[slice] === 'object') {
        state[slice] = parsed[slice];
      }
    }

    return Object.keys(state).length > 0 ? state : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Writes those slices back on every change. Returns the unsubscribe.
 *
 * Debounced, because a burst of dispatches during sign-in would otherwise mean
 * a synchronous JSON.stringify per action on the main thread.
 */
export function startPersisting(store) {
  let timer = null;

  const write = () => {
    timer = null;
    try {
      const state = store.getState();
      const slice = {};
      for (const name of PERSISTED_SLICES) slice[name] = state[name];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slice));
    } catch {
      // Quota exceeded, or storage disabled. The session still works until the
      // tab is closed; it just will not survive a reload.
    }
  };

  const unsubscribe = store.subscribe(() => {
    if (timer) return;
    timer = window.setTimeout(write, WRITE_DELAY_MS);
  });

  return () => {
    unsubscribe();
    if (timer) {
      window.clearTimeout(timer);
      write();
    }
  };
}
