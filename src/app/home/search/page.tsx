"use client";
import { fetchJSON } from "@/utils/request";
import { useCallback, useEffect, useState } from "react";
import { Movie, Show } from "@/utils/typings";
import { DocumentData } from "firebase/firestore";
import AuthPage from "@/app/authentication/page";
import Row from "@/components/Row";
import { ModalComponent } from "@/components/Modal";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<
    | {
        title: string;
        movies: Movie[] | Show[] | DocumentData[];
      }[]
    | undefined
  >();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query");

  const fetchPages = useCallback(async () => {
    const fetchedData = [];
    for (let i = 1; i <= 10; i++) {
      const apiUrl = `https://api.themoviedb.org/3/search/multi?&api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${queryParams}&include_adult=false&language=en-US&page=${i}`;
      const data = await fetchJSON(apiUrl);
      fetchedData.push({
        title: `Page ${i}`,
        movies: data.results,
      });
    }
    setResults(fetchedData);
    setLoading(false);
  }, [queryParams]);

  useEffect(() => {
    fetchPages().then();
  }, [fetchPages, searchParams]);

  return loading ? (
    <AuthPage />
  ) : (
    <>
      <section className="relative space-y-5 pb-24 pl-4 pt-[20%] md:space-y-12 md:pt-[15%] lg:space-y-24 lg:pl-10 lg:pt-[10%]">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          Search Results For:{" "}
          <span className="font-normal">&quot;{queryParams}&quot;</span>
        </h1>
        {results?.map((row) => (
          <Row key={row.title} title="" movies={row.movies} />
        ))}
      </section>
      <ModalComponent />
    </>
  );
}
