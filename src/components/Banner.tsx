"use client";
import Image from "next/image";
import { Movie } from "@/utils/typings";
import { useEffect, useState } from "react";
import { baseURL } from "@/constants/movie";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)],
    );
  }, [netflixOriginals]);

  return (
    <>
      <div
        className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end
        lg:pb-12"
      >
        <div className="absolute left-0 top-0 -z-10 h-[95vh] w-screen">
          <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />
          <div className="absolute inset-0 z-10 h-[150svh] w-full bg-gradient-to-b from-gray-900/10 to-[#010511]" />
          {movie?.backdrop_path || movie?.poster_path ? (
            <Image
              src={`${baseURL}${movie.backdrop_path || movie.poster_path}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              alt="banner img"
            />
          ) : (
            <div />
          )}
        </div>
        <h1 className="text-2xl font-bold text-shadow-md md:text-4xl lg:text-6xl 2xl:text-7xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="line-clamp-3 max-w-xs text-xs text-shadow-md md:max-w-lg lg:max-w-2xl lg:text-xl">
          {movie?.overview}
        </p>
        <div className="flex space-x-4">
          <button className="bannerButton bg-white text-black">
            <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
          </button>
          <button
            onClick={() => {
              setCurrentMovie(movie);
              setShowModal(true);
            }}
            className="bannerButton bg-[gray]/70"
          >
            <AiOutlineInfoCircle className="h-6 w-6 md:h-9 md:w-9" />
            More Info
          </button>
        </div>
      </div>
    </>
  );
}
