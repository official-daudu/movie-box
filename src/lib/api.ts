import { Movie } from "@/types/movies";
import axios, { AxiosError } from "axios";

const API_KEY = process.env.EXPO_PUBLIC_OMDB_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Error logger
function errorLogger(context = false) {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (
      error: AxiosError<{
        message?: string;
      }>
    ) => {
      const url = error.response?.config.url as string;
      const method = error.response?.config.method as string;
      const status = error.response?.status as number;
      const message = error.response?.data?.message as string;
      console.log(`API Error -> ${url}(${status})[${method}]: ${message}`);
      if (context) {
        console.log("context:", error.response?.data);
      }
      return Promise.reject(error);
    }
  );
}

// errorLogger with context enabled
errorLogger();

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  console.log({ API_KEY });
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      type: "movie",
    },
  });

  if (res.data.Response === "False") {
    console.warn("OMDb API error:", res.data.Error); // This will show "Invalid API key!" etc.
    return [];
  }

  return res.data.Search ?? [];
}
