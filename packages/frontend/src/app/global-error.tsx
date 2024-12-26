'use client';

// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
import { useEffect } from 'react';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark dsd">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
