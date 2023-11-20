const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// c4f3f4329a709ec02e77cf525ddb8a5a
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: () => `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: () => ` ${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
    fetchComedyMovies: () => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
    fetchHorrorMovies: () => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
    fetchRomanceMovies: () => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749&page=${Math.floor(Math.random() * (10 - 1) + 1)}`,
    fetchDocumentaries: () => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99&page=${Math.floor(Math.random() * (2 - 1) + 1)}`,
};

export default requests;
