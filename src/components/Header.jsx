import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { logOut, selectIsLoggedIn, selectAuth } from '../features/auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { profileName } = useSelector(selectAuth);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Company name
        </Typography>

        <nav>
          <Link component={RouterLink} to="/" variant="button" color="text.primary" sx={{ mx: 1.5 }}>
            Public
          </Link>
          {isLoggedIn && (
            <Link component={RouterLink} to="/home" variant="button" color="text.primary" sx={{ mx: 1.5 }}>
              Home
            </Link>
          )}
        </nav>

        {isLoggedIn ? (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 1.5 }}>
              {profileName}
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              onClick={() => dispatch(logOut())}
              color="primary"
              variant="outlined"
            >
              Log out
            </Button>
          </>
        ) : (
          <Button component={RouterLink} to="/signin" color="primary" variant="outlined">
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
