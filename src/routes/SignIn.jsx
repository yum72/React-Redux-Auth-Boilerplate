import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import AuthForm from '../components/AuthForm';
import {
  signIn,
  clearErrors,
  selectIsLoggedIn,
  selectAuth
} from '../features/auth/authSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { loginError, isFetching } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Return the user to whatever they were trying to reach before the redirect.
  if (isLoggedIn) {
    return <Navigate to={location.state?.from?.pathname ?? '/home'} replace />;
  }

  return (
    <AuthForm
      title="Sign in"
      submitLabel="Sign in"
      pendingLabel="Signing in…"
      error={loginError}
      isFetching={isFetching}
      passwordAutoComplete="current-password"
      footer={{ to: '/signup', label: 'No account? Sign up' }}
      onSubmit={(values) => dispatch(signIn(values))}
    />
  );
}
