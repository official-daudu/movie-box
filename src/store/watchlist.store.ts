// store/watchlist.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "@/types/movies";

type WatchlistState = {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (imdbID: string) => void;
  isSaved: (imdbID: string) => boolean;
};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      movies: [],

      addMovie: (movie) =>
        set((state) => ({
          movies: [...state.movies, movie],
        })),

      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.imdbID !== id),
        })),

      isSaved: (id) => get().movies.some((m) => m.imdbID === id),
    }),
    {
      name: "watchlist-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
