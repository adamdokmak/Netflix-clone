import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/request";
import {Movie} from "@/utils/typings";
import Row from "@/components/Row";
import {useRecoilSnapshot, useRecoilState} from "recoil";

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
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
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

interface Props {
    netflixOriginals: Movie[]
    trendingNow: Movie[]
    topRated: Movie[]
    actionMovies: Movie[]
    comedyMovies: Movie[]
    horrorMovies: Movie[]
    romanceMovies: Movie[]
    documentaries: Movie[]
}


export default async function Home() {
    const data = await getAPI()
    const getDataByFilters: Props = data.props
    const showModal = useRecoilState()
    return (
        <div className="relative h-screen bg-gradient-to-b from-gray-900/10
        to-[#010511] lg:h-[140vh]">

            <Header/>
            <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-10'>
                <Banner netflixOriginals={getDataByFilters.netflixOriginals}/>
                <section className='md:space-y-24'>
                    <Row title="Trending Now" movies={getDataByFilters.trendingNow}/>
                    <Row title="Top Rated" movies={getDataByFilters.topRated}/>
                    <Row title="Action Thrillers" movies={getDataByFilters.actionMovies}/>
                    {/* My List Component */}
                    <Row title="Comedies" movies={getDataByFilters.comedyMovies}/>
                    <Row title="Scary Movies" movies={getDataByFilters.horrorMovies}/>
                    <Row title="Romance Movies" movies={getDataByFilters.romanceMovies}/>
                    <Row title="Documentaries" movies={getDataByFilters.documentaries}/>
                </section>
            </main>
            {showModal && <Modal/>}
        </div>
    )

}

