"use client";
import Banner from "@/components/Banner";
import Row from "@/components/Row";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import useList from "@/hooks/useList";
import useAuth from "@/hooks/useAuth";
import { FilteredDataProps, FilteredTVData } from "@/utils/typings";

export default function ClientHome({
  getDataByFilters,
}: {
  getDataByFilters: FilteredDataProps & FilteredTVData;
}) {
  const showModal = useRecoilState(modalState);
  const { user } = useAuth();
  const list = useList(user?.uid);
  return !user ? (
    <div />
  ) : (
    <div
      className="relative h-[140svh] overflow-x-clip bg-gradient-to-b
        from-gray-900/10 to-[#010511]"
    >
      <main className="relative pb-24 pl-4 lg:space-y-24 lg:pl-10">
        <Banner netflixOriginals={getDataByFilters.netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={getDataByFilters.trendingNow} />
          <Row title="Top Rated" movies={getDataByFilters.topRated} />
          <Row title="Trending Shows" movies={getDataByFilters.trendingtv} />
          {list.length > 0 && <Row title="My List" movies={list} />}

          <Row
            title="Action Thrillers"
            movies={getDataByFilters.actionMovies}
          />
          <Row
            title="Action & Adventure Shows"
            movies={getDataByFilters.actiontv}
          />
          <Row title="Crime Shows" movies={getDataByFilters.crimetv} />
          <Row title="Comedies" movies={getDataByFilters.comedyMovies} />
          <Row title="Scary Movies" movies={getDataByFilters.horrorMovies} />
          <Row
            title="Animation & Anime Shows"
            movies={getDataByFilters.animationtv}
          />
          <Row title="Romance Movies" movies={getDataByFilters.romanceMovies} />
          <Row title="Drama Shows" movies={getDataByFilters.dramatv} />
          <Row title="Documentaries" movies={getDataByFilters.documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}
