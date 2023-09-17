import Image from 'next/image';
import { Inter } from "next/font/google";
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (

  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
    <div className="flex h-full items-top justify-center">
      <div className="px-6 text-top text-white md:px-12">
        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl"> 
        Crumb Cafe Order Display
        </h1>
      </div>
    </div>
  </div>
  );
}
