"use client";
import Row from "../Row";
import { FilteredDataProps } from "@/utils/typings";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";

export default function MoviesHome({ data }: { data: FilteredDataProps }) {
  const showModal = useRecoilState(modalState);

  return (
    <section className="relative space-y-5 pb-24 pl-4 pt-[20%] md:space-y-12 md:pt-[15%] lg:space-y-24 lg:pl-10 lg:pt-[10%]">
      <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Movies</h1>
      <Row title="Netflix Originals" movies={data.netflixOriginals} />
      <Row title="Romance" movies={data.romanceMovies} />
      <Row title="Comedy" movies={data.comedyMovies} />
      <Row title="Trending Now" movies={data.trendingNow} />
      <Row title="Action" movies={data.actionMovies} />
      <Row title="Horror" movies={data.horrorMovies} />
      <Row title="Top Rated" movies={data.topRated} />
      <Row title="Documentaries" movies={data.documentaries} />
      {showModal && <Modal />}
    </section>
  );
}
