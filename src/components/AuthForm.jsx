import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * The sign in and sign up forms, which are the same form.
 *
 * They differ in four strings and which thunk they dispatch, so they share a
 * component rather than being two near-identical files that drift apart the
 * first time someone changes one of them.
 *
 * `autoComplete` is passed in rather than hardcoded: password managers use it
 * to tell "log in here" from "choose a new password here", and getting it wrong
 * is why some sites offer to save a password nobody set.
 */
export default function AuthForm({
  title,
  submitLabel,
  pendingLabel,
  error,
  isFetching,
  passwordAutoComplete,
  footer,
  onSubmit
}) {
  const [values, setValues] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="flex flex-col items-center">
        <span className="bg-secondary text-secondary-foreground grid size-11 place-items-center rounded-full">
          <LockIcon className="size-5" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* role="alert" so the message is announced when it appears. A failed
            sign in that only changes pixels is invisible to a screen reader. */}
        {error && (
          <p
            role="alert"
            className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
          >
            {error}
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            required
            autoFocus
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete={passwordAutoComplete}
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isFetching}>
          {isFetching ? pendingLabel : submitLabel}
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          <Link to={footer.to} className="hover:text-foreground underline underline-offset-4">
            {footer.label}
          </Link>
        </p>
      </form>
    </div>
  );
}
