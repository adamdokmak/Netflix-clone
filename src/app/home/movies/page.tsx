import requests, { getAPI } from "@/utils/request";
import { FilteredDataProps } from "@/utils/typings";
import MoviesHome from "@/components/pages/MoviesHome";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Movies - Netflix",
};

export default async function Page() {
  const data: FilteredDataProps = await getAPI({
    urls: [
      requests.fetchNetflixOriginals(),
      requests.fetchTrending,
      requests.fetchTopRated,
      requests.fetchActionMovies(),
      requests.fetchComedyMovies(),
      requests.fetchHorrorMovies(),
      requests.fetchRomanceMovies(),
      requests.fetchDocumentaries(),
    ],
    keys: [
      "netflixOriginals",
      "trendingNow",
      "topRated",
      "actionMovies",
      "comedyMovies",
      "horrorMovies",
      "romanceMovies",
      "documentaries",
    ],
  });
  return <MoviesHome data={data} />;
}
