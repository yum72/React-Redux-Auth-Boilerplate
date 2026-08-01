import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        404, page not found
      </h1>
      <Button asChild variant="outline" className="mt-6">
        <Link to="/">Back to start</Link>
      </Button>
    </div>
  );
}
