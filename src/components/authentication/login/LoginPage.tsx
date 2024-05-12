"use client";
import AuthPageImages from "@/components/authentication/AuthPageImages";
import AuthForm from "@/components/authentication/AuthForm";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [firstView, setFirstView] = useState(true);
  const { user } = useAuth();
  const loggedInOnce =
    typeof window !== "undefined" && localStorage.getItem("loggedInOnce");

  useEffect(() => {
    if (loggedInOnce === "true") setFirstView(false);
  }, [loggedInOnce]);

  return user && !firstView ? (
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
