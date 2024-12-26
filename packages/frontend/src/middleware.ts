// https://nextjs.org/docs/app/building-your-application/routing/middleware
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { TLocales } from './types';
import { defaultLocale, locales, matchPublicRouter } from './utils';

// next-auth wrap https://next-auth.js.org/configuration/nextjs#wrap-middleware
export default withAuth(
  function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: (params) => {
        const hasPublicRouter = matchPublicRouter(params.req.nextUrl.pathname);

        if (hasPublicRouter) {
          return true;
        }

        return !!params.token;
      },
    },
  },
);

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
