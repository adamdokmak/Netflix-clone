'use client'
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Row from "@/components/Row";
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";
import Modal from '@/components/Modal'
import {Props} from "@/app/page";

export default function ClientHome({getDataByFilters}: { getDataByFilters: Props }) {
    const showModal = useRecoilState(modalState)
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