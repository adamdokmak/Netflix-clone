"use client";
import AuthPageImages from "@/components/authentication/AuthPageImages";
import AuthForm from "@/components/authentication/AuthForm";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { user } = useAuth();
  const loggedInOnce =
    typeof window !== "undefined" && localStorage.getItem("loggedInOnce");

  return user && loggedInOnce === "true" ? (
    <div />
  ) : (
    <div
      className="relative flex h-screen w-screen flex-col bg-black
        md:items-center md:justify-center md:bg-transparent"
    >
      <AuthPageImages />
      <AuthForm loginForm title="sign in" />
    </div>
  );
}
