import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {AuthProvider} from "@/hooks/useAuth";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Home - Netflix',
    description: 'Practice for Next.js',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
