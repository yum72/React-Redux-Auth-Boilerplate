import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/auth/authSlice';

/**
 * Wraps routes that require a session. Anyone without one is sent to sign in,
 * with the page they wanted recorded in location state so sign in can send
 * them back there rather than dumping everyone on the home page.
 */
export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
