import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Bảo vệ tất cả các route trong /dashboard
};
