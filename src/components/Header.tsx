"use client";
import {
  BellIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import NetflixLogo from "@/components/NetflixLogo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

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
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-5 md:space-x-10">
        <Link href={"/home"}>
          <NetflixLogo className="h-fit w-32 cursor-pointer object-contain" />
        </Link>

        <ul className="flex space-x-2 md:space-x-4">
          <Link href={"/home"} className="HeaderLink">
            Home
          </Link>
          <Link href={"/home/tvshows"} className="HeaderLink">
            TV Shows
          </Link>
          <Link href={"/home/movies"} className="HeaderLink">
            Movies
          </Link>
          <Link href={"/home/mylist"} className="HeaderLink">
            My List
          </Link>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <img
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded "
          onClick={logout}
        />
      </div>
    </header>
  );
}
