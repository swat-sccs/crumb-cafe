'use server';

import { cookies } from 'next/headers';

export async function setIPCookie(ip: string) {
  cookies().set('printerip', ip);
}

export async function getIPCookie() {
  const cookieStore = cookies();
  const IP = cookieStore.get('printerip');

  const out = IP ? IP.value : '192.168.192.168';

  return out;
}
