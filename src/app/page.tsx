import requests from "@/utils/request";
import {Movie} from "@/utils/typings";
import ClientHome from "@/components/ClientHome";

async function getAPI() {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals()).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies()).then((res) => res.json()),
        fetch(requests.fetchComedyMovies()).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies()).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies()).then((res) => res.json()),
        fetch(requests.fetchDocumentaries()).then((res) => res.json()),
    ])

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        }
    }
}

export interface Props {
    netflixOriginals: Movie[]
    trendingNow: Movie[]
    topRated: Movie[]
    actionMovies: Movie[]
    comedyMovies: Movie[]
    horrorMovies: Movie[]
    romanceMovies: Movie[]
    documentaries: Movie[]
}


export default async function Page() {
    const data = await getAPI()
    const getDataByFilters: Props = data.props
    return (
        <ClientHome getDataByFilters={getDataByFilters}/>
    )

}

