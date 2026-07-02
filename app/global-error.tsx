'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* This renders the default Next.js error page.
            You can replace this with your own custom error component.
            The important part is that `Sentry.captureException` is called. */}
        <NextError statusCode={500} title="An error occurred on the server." />
      </body>
    </html>
  );
}