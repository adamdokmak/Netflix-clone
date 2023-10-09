import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import MainRender from "@/components/MainRender";
import {Flip, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - Netflix",
  description: "Netflix Replica",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainRender>
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
        </MainRender>
      </body>
    </html>
  );
}
