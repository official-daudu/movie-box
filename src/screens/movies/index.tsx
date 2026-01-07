import { Button } from "@/components/base/buttons";
import { HomeSearchInput } from "@/components/base/inputs";
import { fetchMovies } from "@/lib/api";
import { Movie } from "@/types/movies";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import debounce from "lodash.debounce";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { EmptyState } from "./components/emptyState";
import MovieCard from "./components/movieCard";

export default function MovieSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("marvel");

  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    // enabled: false,
  });

  const movies = React.useMemo(() => {
    if (!data) return [];

    const map = new Map<string, Movie>();
    data.forEach((movie: Movie) => {
      map.set(movie.imdbID, movie);
    });

    return Array.from(map.values());
  }, [data]);

  console.log("data:", data);
  /**
   * useCallback → avoids re-creating on each render
   */
  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} />,
    []
  );

  const keyExtractor = useCallback((item: Movie) => item.imdbID, []);

  /**
   * Debounced setter
   */
  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQuery(text);
        refetch();
      }, 600),
    [refetch]
  );

  /**
   * Cleanup debounce on unmount
   */
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <View className="flex-1 bg-netflix-black">
      <StatusBar style="light" />
      {/* Header / Escrow */}
      <View className="w-full h-[14%] bg-netflix-red">
        <View
          className="
      flex-row items-center justify-between
      px-4 py-3
      mt-[10%]
      w-full
      gap-2
    "
        >
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="local-movies" size={24} color="white" />
            <Text className="text-white font-bold text-lg">Movie-Box</Text>
          </View>
          <Button
            onPress={() => router.push("/(app)/watch-list")}
            type="scarletOutline"
            rounded="pill"
            className=""
          >
            Watchlist
          </Button>
        </View>
      </View>

      <View className="px-4 -mt-7">
        <HomeSearchInput
          placeholder="Search for a movie"
          onChangeText={debouncedSearch}
        />
      </View>

      <View className="flex-1 mt-5 mx-2">
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              colors={["#E50914"]}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          refreshing={isLoading}
          ListEmptyComponent={
            <EmptyState
              title={"No Movies Found"}
              description={"Try searching for a different movie."}
              illustration={
                <Image
                  source={require("@/assets/images/emptyBag.png")}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              }
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
