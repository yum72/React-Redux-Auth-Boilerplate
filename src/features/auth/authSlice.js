import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../api/client';

/**
 * Auth state. The shape is unchanged from the pre-2026 version of this
 * boilerplate so that forks upgrading in place keep working.
 */
const initialState = {
  profileName: null,
  isLoggedIn: false,
  isFetching: false,
  jwt: null,
  loginError: null,
  signupError: null
};

/**
 * Turns the API's error codes into something worth showing a user. Anything
 * unrecognised is passed through, since the server generally knows better than
 * a generic fallback here.
 */
const readableError = (error) => {
  switch (error.code) {
    case 'WRONG_CREDENTIAL':
      return 'Incorrect username or password';
    case 'USERNAME_IS_NOT_AVAILABLE':
      return 'That username is already taken';
    default:
      return error.message;
  }
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await request('/user/login', {
        method: 'POST',
        body: { username, password }
      });
      return { username, jwt: data.jwt };
    } catch (error) {
      return rejectWithValue(readableError(error));
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      await request('/user/register', {
        method: 'POST',
        body: { username, password }
      });
      // Sign straight in on a successful registration rather than bouncing the
      // user to a login form to type the credentials they just chose.
      await dispatch(signIn({ username, password }));
      return true;
    } catch (error) {
      return rejectWithValue(readableError(error));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      return await request('/user/me', { token: getState().auth.jwt });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    clearErrors: (state) => {
      state.loginError = null;
      state.signupError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isFetching = true;
        state.loginError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isLoggedIn = true;
        state.profileName = action.payload.username;
        state.jwt = action.payload.jwt;
        state.loginError = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isFetching = false;
        state.loginError = action.payload ?? 'Sign in failed';
      })
      .addCase(signUp.pending, (state) => {
        state.isFetching = true;
        state.signupError = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isFetching = false;
        state.signupError = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isFetching = false;
        state.signupError = action.payload ?? 'Sign up failed';
      });
  }
});

export const { logOut, clearErrors } = authSlice.actions;

/** True only when there is both a session flag and a token to go with it. */
export const selectIsLoggedIn = (state) =>
  state.auth.isLoggedIn && state.auth.jwt !== null;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
