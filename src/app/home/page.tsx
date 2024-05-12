import requests, { getAPI } from "@/utils/request";
import { FilteredDataProps, FilteredTVData } from "@/utils/typings";
import ClientHome from "@/components/pages/ClientHome";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data: FilteredDataProps & FilteredTVData = await getAPI({
    urls: [
      requests.fetchNetflixOriginals(),
      requests.fetchTrending,
      requests.fetchTopRated,
      requests.fetchActionMovies(),
      requests.fetchComedyMovies(),
      requests.fetchHorrorMovies(),
      requests.fetchRomanceMovies(),
      requests.fetchDocumentaries(),
      requests.fetchTrendingTVShows,
      requests.fetchActionTVShows(),
      requests.fetchComedyTVShows(),
      requests.fetchAnimationTVShows(),
      requests.fetchMysteryTVShows(),
      requests.fetchCrimeTVShows(),
      requests.fetchDramaTVShows(),
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
      "trendingtv",
      "actiontv",
      "comedytv",
      "animationtv",
      "mysterytv",
      "crimetv",
      "dramatv",
    ],
  });
  return <ClientHome getDataByFilters={data} />;
}
