import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import MainRender from "@/components/MainRender";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Home - Netflix',
    description: 'Netflix Replica',
}

export default function RootLayout({ children }: {children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainRender>
            {children}
        </MainRender>
      </body>
    </html>
  );
}
