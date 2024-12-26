export const publicRouter = ['login'];

export const matchPublicRouter = (pathname: string): boolean => {
  const pathnameHasLocale = publicRouter.some(
    (router) => pathname.startsWith(`/${router}`) || pathname.startsWith(`/${router}`),
  );
  return pathnameHasLocale;
};
