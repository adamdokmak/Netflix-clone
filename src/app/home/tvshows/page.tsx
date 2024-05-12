import requests, { getAPI } from "@/utils/request";
import { FilteredTVData } from "@/utils/typings";
import TvShowHome from "@/components/pages/TvShowHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tv Shows - Netflix",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const data: FilteredTVData = await getAPI({
    urls: [
      requests.fetchTrendingTVShows,
      requests.fetchActionTVShows(),
      requests.fetchComedyTVShows(),
      requests.fetchAnimationTVShows(),
      requests.fetchMysteryTVShows(),
      requests.fetchCrimeTVShows(),
      requests.fetchDramaTVShows(),
    ],
    keys: [
      "trendingtv",
      "actiontv",
      "comedytv",
      "animationtv",
      "mysterytv",
      "crimetv",
      "dramatv",
    ],
  });
  return <TvShowHome data={data} />;
}
