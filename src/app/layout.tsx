import ThemeRegistry from './ThemeRegistry';
import { NextAuthProvider } from './NextAuthProvider';
import { NextURL } from 'next/dist/server/web/next-url';
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head

        POS PRINT EPSON
        https://github.com/rubenruvalcabac/epson-epos-sdk-react?tab=readme-ov-file
        https://files.support.epson.com/pdf/pos/bulk/tm-i_epos-print_um_en_revk.pdf#page=38&zoom=100,64,117
      */}

        <head />

        <Script src="./epos-2.27.0.js"></Script>

        <body>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </body>
      </html>
    </NextAuthProvider>
  );
}
