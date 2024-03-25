export const dynamic = 'force-dynamic'; // defaults to auto
import NextAuth from 'next-auth';
import { config } from '@/app/lib/auth';

export const handler = NextAuth(config);

export { handler as GET, handler as POST };
