import { cookies } from 'next/headers';
import { NextAuthOptions, User } from 'next-auth';
// eslint-disable-next-line
import CredentialsProvider from 'next-auth/providers/credentials';

// import { VLogin, VLoginResponse } from "@/codegen/index";

// import ApiServerSide from "./apiServerSide";

// https://github.com/vercel/next.js/discussions/50511
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(_credentials): Promise<User | null> {
        // const { email, password } = credentials as VLogin;

        try {
          // Call api login =>>>>

          // const res = await ApiServerSide.Post<VLogin, VLoginResponse>('login', {
          //   email,
          //   password,
          // });

          const cookieStore = cookies();

          // cookieStore.set('next-auth.api-token', res.data.token);

          cookieStore.set('next-auth.api-token', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx');

          // return {
          //   id: res.data.user.id,
          //   email: res.data.user.email,
          //   name: res.data.user.name,
          // };

          return {
            id: '31231233',
            email: 'admin@gmail.com',
            name: 'hai hoang',
          };
        } catch (error) {
          console.log('Error: ', error);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

export default authOptions;
