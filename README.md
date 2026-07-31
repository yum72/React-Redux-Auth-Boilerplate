# React Redux Auth Boilerplate

A starting point for a React app that needs sign in, sign up, routes only
logged-in users can reach, and a session that survives a refresh.

**Status:** maintained · rewritten 2026 · React 19

The pieces here are the ones that are tedious to wire up and easy to get subtly
wrong: where the token lives, what happens on reload before it is read back, and
where a user lands after being bounced to the login page.

## Stack

| | |
|---|---|
| Build | Vite 6 |
| UI | React 19, MUI 6 |
| State | Redux Toolkit 2 |
| Persistence | redux-persist |
| Routing | React Router 7 |
| HTTP | native `fetch` |

## Quick start

```bash
npm install
cp .env.example .env      # point VITE_API_URL at your API
npm run dev
```

Then open http://localhost:3000.

## What you get

**Sign in and sign up**, both wired to `createAsyncThunk`, with loading state on
the submit button and server errors surfaced in the form. Registering signs you
straight in rather than sending you back to a login form to retype credentials
you just chose.

**Protected routes** through a `ProtectedRoute` wrapper. It records the page the
user was trying to reach in router state, so after signing in they land there
instead of on a generic home page.

**Persisted sessions.** Only the `auth` slice is persisted. Persisting the whole
store is the usual mistake: it survives reloads you wanted and ones you did not,
and it quietly makes every reducer's initial state a lie. Reload while signed in
and you stay signed in; the counter on the protected page resets, which is the
difference made visible.

**No flash of logged-out UI.** `PersistGate` holds the first render until the
persisted state is read back. Without it the app paints a logged-out header that
flips a moment later, and protected routes redirect before the token is restored.

## The API it expects

Set `VITE_API_URL` to a base URL serving three endpoints:

| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/user/login` | `{ username, password }` | `{ jwt }` |
| POST | `/user/register` | `{ username, password }` | `{ userId }` |
| GET | `/user/me` | Bearer token | profile |

Errors are read from `message` on the response body. Two codes get friendlier
wording in `authSlice.js`: `WRONG_CREDENTIAL` and `USERNAME_IS_NOT_AVAILABLE`.
Anything else is shown as the server sent it, since the server usually knows
better than a generic fallback.

## Layout

```
src/
  api/client.js               fetch wrapper, throws ApiError
  app/store.js                store, persist config
  features/auth/authSlice.js  thunks, reducers, selectors
  features/counter/           demo slice, delete it
  components/Header.jsx
  components/ProtectedRoute.jsx
  routes/                     SignIn, Register, Home, Public, NotFound
```

## What to change first

1. Point `VITE_API_URL` at your API, and adjust the three paths in `authSlice.js`
   if yours differ.
2. Delete `features/counter/` and the card in `routes/Home.jsx` that uses it.
3. Replace "Company name" in `components/Header.jsx`.
4. Add your own routes to `App.jsx`, wrapping the protected ones in
   `<ProtectedRoute>`.

## A note on storing the JWT

The token goes in `localStorage`, which any script running on the page can read.
That is a reasonable trade for a starter and for internal tools, and it is what
makes the refresh-survives-reload behaviour work with no backend cooperation.

For anything handling real user data, prefer an httpOnly cookie the browser sends
on its own, and persist only non-sensitive profile fields here. That is a change
to `persistConfig` in `app/store.js` plus a `credentials: 'include'` in
`api/client.js`.

## History

Rewritten in 2026. The original was Create React App 3.3 with React 16,
Material-UI v4, hand-written Redux ducks and `redux-localstorage`, which has been
unmaintained since 2016. It also shipped `"private": true`, which stops a
boilerplate being used as one.

The auth state shape is unchanged, so a fork upgrading in place keeps working.
The CRA version is still in the history if you need it.

## License

MIT
