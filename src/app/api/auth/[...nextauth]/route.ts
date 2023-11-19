import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/app/lib/mongodb';
import { MongoClient } from "mongodb";


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(dbConnect().then((m) => m.connection.getClient()) as Promise<MongoClient>),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Aaron" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Find your user in the database using MongoDBAdapter
        const user = await authOptions.adapter!.getUser!(
          "6471f710f772cf139bc5142e"
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export default handler