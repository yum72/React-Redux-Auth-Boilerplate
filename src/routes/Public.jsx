import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { selectIsLoggedIn } from '../features/auth/authSlice';

export default function Public() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Public page</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        Anyone can see this. <strong className="text-foreground">/home</strong>{' '}
        is protected: without a session it redirects to sign in, and after
        signing in it sends you back to whichever page you were trying to reach.
      </p>
      <Button asChild className="mt-6">
        <Link to={isLoggedIn ? '/home' : '/signin'}>
          {isLoggedIn ? 'Go to home' : 'Sign in'}
        </Link>
      </Button>
    </div>
  );
}
