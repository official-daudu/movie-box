import { SafeArea } from "@/components/base/safeArea";
import { PageHeader } from "@/components/inc/PageHeader";
import { useWatchlistStore } from "@/store/watchlist.store";
import { Movie } from "@/types/movies";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { EmptyState } from "./components/emptyState";
import MovieCard from "./components/movieCard";

const WatchlistScreen = () => {
  const router = useRouter();
  const movies = useWatchlistStore((s) => s.movies);
  const hydrated = useWatchlistStore.persist.hasHydrated();

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} />,
    []
  );

  if (!hydrated) {
    return (
      <View className="flex-1 justify-center items-center bg-netflix-black">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <SafeArea>
      <StatusBar style="light" />

      {/* Header */}
      <PageHeader name="Watch-list" backButton={true} variant="dark" />

      {/* List */}
      <View className="flex-1 mt-5 mx-2">
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={5}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: "90%",
                alignSelf: "center",
                backgroundColor: "#E7EAEE",
                marginVertical: 8,
              }}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Your watch-list is empty"
              description="Add movies to your watch-list to see them here."
              actionLabel="Browse movies"
              onAction={() => router.replace("/(app)")}
              illustration={
                <Image
                  source={require("@/assets/images/emptyBag.png")}
                  style={{ width: 150, height: 150 }}
                />
              }
            />
          }
        />
      </View>
    </SafeArea>
  );
};

export default WatchlistScreen;
