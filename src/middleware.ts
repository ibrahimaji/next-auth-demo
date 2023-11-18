import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/'] //this will exclude root page from being protected
});

// this will protect all the route
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
