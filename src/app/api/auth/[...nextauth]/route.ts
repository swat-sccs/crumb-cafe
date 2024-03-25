export const dynamic = 'force-dynamic'; // defaults to auto
import NextAuth from 'next-auth';
import { config } from '@/app/lib/auth';

const handler = NextAuth(config);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export { handler as GET, handler as POST };
