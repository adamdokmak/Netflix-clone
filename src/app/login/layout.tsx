import '../globals.css'
import type {Metadata} from 'next'
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: 'Login - Netflix',
    description: 'Netflix Replica',
}

export default function RootLayout({ children }: {children: ReactNode }) {
  return (
      <>
            {children}
      </>
  );
}
