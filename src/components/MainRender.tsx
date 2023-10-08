"use client";
import { AuthProvider } from "@/hooks/useAuth";
import { ReactNode } from "react";
import {RecoilRoot} from "recoil";

interface IMainRender {
  children: ReactNode;
}

export default function MainRender({ children }: IMainRender) {
  return (
    <RecoilRoot>
      <AuthProvider>{children}</AuthProvider>
    </RecoilRoot>
  );
}
