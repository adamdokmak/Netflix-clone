const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: () =>
    ` ${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchComedyMovies: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchHorrorMovies: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchRomanceMovies: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchDocumentaries: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchTrendingTVShows: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  fetchAnimationTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchComedyTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchCrimeTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=80&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchDramaTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=18&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchMysteryTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
  fetchActionTVShows: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
};

export async function fetchJSON(url: string) {
  const response = await fetch(url);
  return response.json();
}

export async function getAPI({
  urls,
  keys,
}: {
  urls: string[];
  keys: string[];
}) {
  const results = await Promise.all(urls.map((url) => fetchJSON(url)));
  return results.reduce((acc, result, index) => {
    const key = keys[index];
    acc[key] = result.results;
    return acc;
  }, {});
}

export default requests;
