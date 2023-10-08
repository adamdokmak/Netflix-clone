import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Login - Netflix',
    description: 'Netflix Replica',
}

export default function RootLayout({ children }: {children: ReactNode }) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  );
}
