"use client";
import AuthPageImages from "@/components/authentication/AuthPageImages";
import AuthForm from "@/components/authentication/AuthForm";
import useAuth from "@/hooks/useAuth";

export default function SignupPage() {
  const { user } = useAuth();
  return user ? (
    <div />
  ) : (
    <div
      className="relative flex h-screen w-screen flex-col bg-black
        md:items-center md:justify-center md:bg-transparent"
    >
      <AuthPageImages />
      <AuthForm signupForm title="sign up" />
    </div>
  );
}
