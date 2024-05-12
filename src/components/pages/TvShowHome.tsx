"use client";
import Row from "../Row";
import { FilteredTVData } from "@/utils/typings";
import { ModalComponent } from "@/components/Modal";

export default function TvShowHome({ data }: { data: FilteredTVData }) {
  return (
    <>
      <section className="relative space-y-5 pb-24 pl-4 pt-[20%] md:space-y-12 md:pt-[15%] lg:space-y-24 lg:pl-10 lg:pt-[10%]">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Tv Shows</h1>
        <Row title="Trending Now" movies={data.trendingtv} />
        <Row title="Comedy" movies={data.comedytv} />
        <Row title="Action & Adventure" movies={data.actiontv} />
        <Row title="Animation & Anime" movies={data.animationtv} />
        <Row title="Crime" movies={data.crimetv} />
        <Row title="Drama" movies={data.dramatv} />
      </section>
      <ModalComponent />
    </>
  );
}
