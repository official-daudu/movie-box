/**
 * Single movie item returned from OMDb search
 * https://www.omdbapi.com/
 */
export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
};

/**
 * Raw OMDb API search response
 */
export type OMDbSearchResponse = {
  Search: Movie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};
