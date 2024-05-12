import { Metadata } from "next";
import SignupPage from "@/components/authentication/signup/SignupPage";

export const metadata: Metadata = {
  title: "Sign Up - Netflix",
};

export default function Page() {
  return <SignupPage />;
}
