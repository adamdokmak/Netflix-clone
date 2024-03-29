import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
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
import { CheckmarkIcon } from "react-hot-toast";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
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

    fetchMovie();
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
  }, [db, movie?.id]);

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1,
      ),
    [movies],
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
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl max-h-[90vh] overflow-x-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9
            w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[46.25%]">
          {videoLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-[#181818]"></div>
          )}
          <ReactPlayer
            className="scale-[1.55] md:scale-[1.35] -z-10 overflow-hidden"
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
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
                className="flex items-center gap-x-2 rounded bg-white py-1 px-8 text-xl
                                font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {!addedToList ? (
                  <PlusIcon className="w-8 h-8 transition" />
                ) : (
                  <CheckmarkIcon className="w-8 h-8 text-white transition" />
                )}
              </button>
              <button className="modalButton">
                  <HandThumbUpIcon className="w-5 h-5" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="w-7 h-7" />
              ) : (
                <SpeakerWaveIcon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center content-center space-x-2 text-sm">
              <h1 className="font-bold text-lg">
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
              <p className="w-5/6">{movie?.overview}</p>
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
