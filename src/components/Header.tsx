"use client";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import NetflixLogo from "@/components/NetflixLogo";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));
  const [modalShown] = useRecoilState(modalState);
  const router = useRouter();
  const { logout } = useAuth();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const scroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <header
      className={`${isScrolled && "bg-[#141414]"} ${modalShown && isScrolled ? "opacity-0" : modalShown && !isScrolled ? "opacity-50" : ""} z-20 flex w-full justify-between gap-10 transition-all`}
    >
      <div className="flex w-fit items-center space-x-2 md:space-x-10">
        <Link href={"/home"}>
          <NetflixLogo className="h-fit max-h-5 w-20 cursor-pointer object-contain md:max-h-10 md:w-32" />
        </Link>

        <ul
          className={`${searching && "hidden"} md:!flex flex w-fit justify-start gap-3 whitespace-nowrap md:space-x-4`}
        >
          <Link href={"/home"} className="HeaderLink hidden sm:flex">
            Home
          </Link>
          <Link href={"/home/tvshows"} className=" HeaderLink">
            TV Shows
          </Link>
          <Link href={"/home/movies"} className="HeaderLink">
            Movies
          </Link>
          <Link href={"/home/mylist"} className="HeaderLink hidden sm:flex">
            My List
          </Link>
        </ul>
      </div>
      <div className="ml-10 max-w-sm flex w-full items-center justify-end space-x-4 text-sm">
        <div
          onClick={() => setSearching(!searching)}
          className="relative flex h-full w-full min-w-fit shrink grow-0 justify-between rounded-md border border-neutral-200 px-2 py-1"
        >
          <input
            defaultValue={searchQuery || ""}
            onChange={(event) => {
              router.push(
                `/home/search?${createQueryString("query", event.target.value)}`,
              );
              if (event.target.value === "") {
                router.replace("/home");
              }
              setSearchQuery(event.target.value);
            }}
            className="w-full bg-transparent outline-none"
          />
          <SearchIcon
            onClick={() => {
              if (searchQuery) {
                router.replace(
                  `/home/search?${createQueryString("query", searchQuery)}`,
                );
              }
            }}
            className=" inline size-5 cursor-pointer"
          />
        </div>
        <Image
          src="/PFP.png"
          width={30}
          height={30}
          alt="profile picture"
          className="shrink-0 cursor-pointer rounded "
          onClick={logout}
        />
      </div>
    </header>
  );
}
