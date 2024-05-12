import Button from "@/components/authentication/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "@/utils/typings";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userCredentialsAtom } from "@/atoms/userCredentialsAtom";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

type AuthFormProps = {
  loginForm?: boolean;
  signupForm?: boolean;
  title: string;
};

export default function AuthForm({
  loginForm,
  signupForm,
  title,
}: AuthFormProps) {
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [userCredentials, setUserCredentials] =
    useRecoilState(userCredentialsAtom);

  const { signUp, signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (signupForm) {
      setSignupLoading(true);
      setUserCredentials({ email, password });
      await signUp(email, password);
    } else if (loginForm) {
      setLoginLoading(true);
      setUserCredentials({ email, password });
      await signIn(email, password);
    }
    setLoginLoading(false);
    setSignupLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded bg-black/75 px-6 py-10
            md:mt-0 md:max-w-md md:px-14"
    >
      <h1 className="text-4xl font-semibold capitalize">{title}</h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            className="input"
            type="email"
            defaultValue={userCredentials?.email}
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid email.
            </p>
          )}
        </label>
        <label className="inline-block w-full">
          <input
            className="input"
            type="password"
            defaultValue={userCredentials?.password}
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must contain between 6 and 60 characters.
            </p>
          )}
        </label>
      </div>

      {loginForm && (
        <div className="flex flex-col gap-1.5">
          {loginLoading ? <Button loading={loginLoading} /> : <Button />}
          <Link href={"/signup"}>
            <span className="text-sm text-gray-500 hover:text-[#e50914] hover:underline">
              Don&apos;t have an account?
            </span>
          </Link>
        </div>
      )}

      {signupForm && (
        <div className="flex flex-col gap-1.5">
          {signupLoading ? (
            <Button className="bg-white text-black" loading={signupLoading} />
          ) : (
            <Button className="bg-white text-black" cta="Create Account" />
          )}
          <Link href={"/login"}>
            <span className="text-sm text-gray-500 hover:text-[#e50914] hover:underline">
              Login with your existing account
            </span>
          </Link>
        </div>
      )}
    </form>
  );
}
