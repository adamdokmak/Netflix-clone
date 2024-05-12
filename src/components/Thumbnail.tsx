import { Movie } from "@/utils/typings";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";

type ThumbnailProps = {
  movie: Movie | DocumentData;
};

export default function Thumbnail({ movie }: ThumbnailProps) {
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="relative h-28 min-w-[200px] cursor-pointer transition duration-200
        ease-out md:h-36 md:min-w-[260px] md:hover:scale-95"
    >
      {!imageLoaded && <ThumbnailFallback />}
      {movie.backdrop_path && movie.poster_path !== "" ? (
        <Image
          onLoad={() => setImageLoaded(true)}
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="pointer-events-none rounded-sm object-cover md:rounded"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          alt="movie image"
        />
      ) : (
        <ThumbnailFallback />
      )}
    </div>
  );
}

function ThumbnailFallback() {
  return (
    <div
      className="relative h-28 min-w-[200px] animate-pulse cursor-pointer rounded-xl bg-[#242424]
        transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-95"
    />
  );
}
