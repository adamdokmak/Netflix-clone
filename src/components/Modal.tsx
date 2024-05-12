import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import {
  HandThumbUpIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Element, Genre, Movie } from "@/utils/typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { DocumentData } from "firebase/firestore";
import { db } from "@/firebase/init";
import { GrSubtract } from "react-icons/gr";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, _] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`,
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer",
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie().then();
  }, [movie]);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => {
          setMovies(snapshot.docs);
        },
      );
    }
  }, [movie?.id, user]);

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1,
      ),
    [movie?.id, movies],
  );

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
        { ...movie },
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setVideoLoading(true);
  };

  function semanticYear() {
    let year = movie?.first_air_date || movie?.release_date;
    return year && year.slice(0, 4).replaceAll("-", " ");
  }

  function semanticOGLang() {
    let language = movie?.original_language;
    return language && language.toUpperCase();
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto max-h-[90vh] overflow-y-scroll w-full max-w-5xl overflow-x-clip rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9
            w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[70%] md:pt-[55%]">
          {videoLoading && (
            <div className="absolute left-0 top-0 h-full w-full bg-[#181818]"></div>
          )}
          <ReactPlayer
            className="-z-10 scale-[1.6] overflow-hidden md:scale-[1.35]"
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            controls={false}
            loop
            onReady={() => setVideoLoading(false)}
            muted={muted}
          />

          <div
            className="absolute bottom-10 flex w-full items-center justify-between
                        px-10"
          >
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 py-1 text-xl
                                font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {!addedToList ? (
                  <PlusIcon className="size-8 transition" />
                ) : (
                  <GrSubtract className="size-6 text-white transition" />
                )}
              </button>
              <button className="hidden sm:flex modalButton">
                <HandThumbUpIcon className="h-5 w-5" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-7 w-7" />
              ) : (
                <SpeakerWaveIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex content-center items-center space-x-2 text-sm">
              <h1 className="text-lg font-bold">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <p className="font-semibold text-green-400">
                {(movie?.vote_average * 10).toFixed(0)}% Match
              </p>
              <p className="font-light">{semanticYear()}</p>
              <div
                className="flex h-4 items-center justify-center rounded border
              border-white/40 px-1.5 text-xs"
              >
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6 line-clamp-5 md:line-clamp-none">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genre: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {semanticOGLang()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}
