import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/hooks/useAuth";
import ClientRecoil from "@/components/ClientRecoil";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - Netflix",
  description: "Netflix Replica",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRecoil>
          <AuthProvider>
            {children}
            <ToastContainer
              position="bottom-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              transition={Flip}
              draggable
              pauseOnHover
              theme="dark"
            />
          </AuthProvider>
        </ClientRecoil>
      </body>
    </html>
  );
}
