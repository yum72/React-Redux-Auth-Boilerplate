import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { increment, decrement, selectCount } from '../features/counter/counterSlice';
import { selectAuth } from '../features/auth/authSlice';

export default function Home() {
  const count = useSelector(selectCount);
  const { profileName } = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Protected page
        </Typography>
        <Typography variant="h3" component="p" gutterBottom>
          {count}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Signed in as {profileName}. The counter is not persisted, so it resets
          on reload while your session survives.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button size="small" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </CardActions>
    </Card>
  );
}
