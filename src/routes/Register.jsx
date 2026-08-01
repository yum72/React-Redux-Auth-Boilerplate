import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import AuthForm from '../components/AuthForm';
import {
  signUp,
  clearErrors,
  selectIsLoggedIn,
  selectAuth
} from '../features/auth/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { signupError, isFetching } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // signUp signs in on success, so a completed registration lands here.
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <AuthForm
      title="Sign up"
      submitLabel="Sign up"
      pendingLabel="Creating account…"
      error={signupError}
      isFetching={isFetching}
      passwordAutoComplete="new-password"
      footer={{ to: '/signin', label: 'Already have an account? Sign in' }}
      onSubmit={(values) => dispatch(signUp(values))}
    />
  );
}
