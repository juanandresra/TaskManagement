import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        // fetch http://localhost:4000/users/login
        const res = await fetch('http://localhost:4000/users/login', {
          method: 'POST',
          body: JSON.stringify({
            identifier: credentials?.identifier,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        if (res.ok && user) {
          return user.data
        }
        throw new Error('Invalid credentials')
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    newUser: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({account, token, user, profile, session}) {
      if(user) token.user = user;
      return token;
    },
    session({session,token}) {
      session.user = token.user as any;
      return session;
    }
  }
});

export { handler as GET, handler as POST };