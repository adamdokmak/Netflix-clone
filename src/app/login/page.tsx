"use client";
import {Metadata} from "next";
import Image from "next/image";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import {ImSpinner2} from "react-icons/im";
import {useRecoilState} from "recoil";
import {errorState} from "@/atoms/loginErrorAtom";

const metadata: Metadata = {
    title: "Login - Netflix",
};

interface Inputs {
    email: string;
    password: string;
}

export default function Page() {
    const [login, setLogin] = useState(false);
    const [loginLoading, setLoginLoading] = useRecoilState(errorState)

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>();

    const {signIn, signUp} = useAuth();
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        setLoginLoading(true);
        if (login) {
            await signIn(email, password);
        } else {
            await signUp(email, password);
        }
    };
    return (
        <div
            className="relative flex h-screen w-screen flex-col bg-black
        md:items-center md:justify-center md:bg-transparent"
        >
            <Image
                src="https://rb.gy/p2hphi"
                layout="fill"
                className="-z-10 !hidden opacity-60 sm:!inline"
                objectFit="cover"
                alt="background image"
            />
            <img
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain transition-all md:left-10 md:top-6"
                width={150}
                height={150}
                alt="netflix logo"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
            md:mt-0 md:max-w-md md:px-14"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            {...register("email", {required: true})}
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
                            placeholder="Password"
                            {...register("password", {required: true})}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 6 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>

                {loginLoading ? (
                    <button
                        className="flex items-center justify-center w-full rounded bg-[#e50914] py-3 font-semibold"
                        onClick={() => setLogin(true)}
                    >
                        <ImSpinner2 className="animate-spin w-6 h-6"/>{" "}
                    </button>
                ) : (
                    <button
                        className="w-full rounded bg-[#e50914] py-3 font-semibold"
                        onClick={() => setLogin(true)}
                    >
                        Sign In
                    </button>
                )}

                {loginLoading ? (
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full rounded bg-[#ffffff] text-black py-3 -translate-y-5 font-semibold"
                        onClick={() => setLogin(false)}
                    >
                        <ImSpinner2 className="animate-spin w-6 h-6"/>{" "}
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full rounded bg-[#ffffff] text-black py-3 -translate-y-5 font-semibold"
                        onClick={() => setLogin(false)}
                    >
                        Create an account
                    </button>
                )}
            </form>
        </div>
    );
}
