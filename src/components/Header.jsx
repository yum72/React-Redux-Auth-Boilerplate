import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  logOut,
  selectIsLoggedIn,
  selectAuth
} from '../features/auth/authSlice';

/* NavLink rather than Link, so the current page is marked in the nav instead of
   every link looking identical wherever you are. */
const navLinkClass = ({ isActive }) =>
  cn(
    'text-sm font-medium transition-colors',
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
  );

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { profileName } = useSelector(selectAuth);

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-6 px-4">
        <Link to="/" className="font-semibold tracking-tight">
          Company name
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink to="/" className={navLinkClass}>
            Public
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
          )}
        </nav>

        <div className="ml-auto">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {profileName}
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Signed in</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => dispatch(logOut())}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/signin">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
