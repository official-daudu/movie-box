import { Button } from "@/components/base/buttons";
import { HomeSearchInput } from "@/components/base/inputs";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { fetchMovies } from "@/lib/api";
import { Movie } from "@/types/movies";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { EmptyState } from "./components/emptyState";
import MovieCard from "./components/movieCard";

const MovieSearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("marvel");

  // Debounced value
  const debouncedSearch = useDebouncedValue(searchText, 600);

  const {
    data: movies = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["movies", debouncedSearch],
    queryFn: ({ signal }) => fetchMovies(debouncedSearch, signal),
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
    select: (data) => {
      // Deduplicate safely
      const map = new Map<string, Movie>();
      data.forEach((movie) => map.set(movie.imdbID, movie));
      return Array.from(map.values());
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} />,
    []
  );

  const keyExtractor = useCallback((item: Movie) => item.imdbID, []);

  // Initial loading screen only
  if (isLoading && movies.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-netflix-black">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-netflix-black">
      <StatusBar style="light" />

      {/* Header */}
      <View className="w-full h-[14%] bg-netflix-red">
        <View className="flex-row items-center justify-between px-4 py-3 mt-[10%]">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="local-movies" size={24} color="white" />
            <Text className="text-white font-bold text-lg">Movie-Box</Text>
          </View>

          <Button
            onPress={() => router.push("/(app)/watch-list")}
            type="scarletOutline"
            rounded="pill"
          >
            Watchlist
          </Button>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 -mt-7">
        <HomeSearchInput
          placeholder="Search for a movie"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Loading indicator while searching */}
      {isFetching && (
        <View className="py-2">
          <ActivityIndicator size="small" color="#E50914" />
        </View>
      )}

      {/* Results */}
      <View className="flex-1 mt-3 mx-2">
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={5}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              colors={["#E50914"]}
              refreshing={isFetching}
              onRefresh={refetch}
            />
          }
          ListEmptyComponent={() => {
            if (isFetching) return null;

            if (!debouncedSearch) {
              return (
                <EmptyState
                  title="Search for a movie"
                  description="Start typing to discover movies."
                />
              );
            }

            if (isError) {
              return (
                <EmptyState
                  title="Something went wrong"
                  description="Please try again."
                  actionLabel="Retry"
                  onAction={refetch}
                />
              );
            }

            return (
              <EmptyState
                title="No movies found"
                description="Try a different search term."
                illustration={
                  <Image
                    source={require("@/assets/images/emptyBag.png")}
                    style={{ width: 150, height: 150 }}
                  />
                }
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MovieSearchScreen;
