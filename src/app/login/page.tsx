import { Metadata } from "next";
import LoginPage from "@/components/authentication/login/LoginPage";

export const metadata: Metadata = {
  title: "Login - Netflix",
};

export default function Page() {
  return <LoginPage />;
}
