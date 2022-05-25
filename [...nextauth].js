import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        //const baseUrl = process.env.MAGENTO_URL;
        const response = await fetch('http://34.244.209.123:10001/api/v1/user-management/user-login',
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // Returning token to set in session

        return {
            token: data
          };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
  },
});