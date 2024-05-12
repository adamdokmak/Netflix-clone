export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type Show = {
  title: string;
  backdrop_path: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  video?: boolean;
  adult?: boolean;
};

export type FilteredTVData = {
  trendingtv: Show[];
  actiontv: Show[];
  comedytv: Show[];
  animationtv: Show[];
  mysterytv: Show[];
  crimetv: Show[];
  dramatv: Show[];
};

export type Element = {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
};

export type Inputs = {
  email: string;
  password: string;
};

export type FilteredDataProps = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
};

export type SearchDataProps = {
  searchedFor: Movie[] | Show[]
};
