import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/auth/authSlice';

export default function Public() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Public page
      </Typography>
      <Typography color="text.secondary" paragraph>
        Anyone can see this. <strong>/home</strong> is protected: without a
        session it redirects to sign in, and after signing in it sends you back
        to whichever page you were trying to reach.
      </Typography>
      <Button
        component={RouterLink}
        to={isLoggedIn ? '/home' : '/signin'}
        variant="contained"
      >
        {isLoggedIn ? 'Go to home' : 'Sign in'}
      </Button>
    </Box>
  );
}
