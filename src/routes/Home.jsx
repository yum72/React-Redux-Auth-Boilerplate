import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  increment,
  decrement,
  selectCount
} from '../features/counter/counterSlice';
import { selectAuth } from '../features/auth/authSlice';

export default function Home() {
  const count = useSelector(selectCount);
  const { profileName } = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          Protected page
        </CardTitle>
        <CardDescription>Signed in as {profileName}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-5xl font-semibold tabular-nums">{count}</p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          The counter is not persisted, so it resets on reload while the session
          survives. Only the slices listed in{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            src/app/persist.js
          </code>{' '}
          are saved.
        </p>
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant="outline" size="sm" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </CardFooter>
    </Card>
  );
}
