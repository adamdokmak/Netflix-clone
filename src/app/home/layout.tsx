import { ReactNode } from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className='overflow-x-clip'>
      <Header />
      {children}
    </section>
  );
}
