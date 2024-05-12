"use client";
import { Movie } from "@/utils/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Thumbnail from "@/components/Thumbnail";
import { useRef, useState } from "react";
import { DocumentData } from "firebase/firestore";

type Props = {
  title: string;
  movies: Movie[] | DocumentData[];
};

export default function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-fit cursor-pointer text-base font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl ">
        {title}
      </h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon
          className={`absolute bottom-0 left-2 top-0 z-40 m-auto
                h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-3 overflow-hidden overflow-x-scroll scrollbar-hide md:space-x-2.5"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute bottom-0 right-2 top-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
