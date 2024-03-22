import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_SECRET || '',
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
    }),
  ],
});

export { handler as GET, handler as POST };
