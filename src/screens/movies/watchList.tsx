import { Button } from "@/components/base/buttons";
import { SafeArea } from "@/components/base/safeArea";
import { useWatchlistStore } from "@/store/watchlist.store";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, View } from "react-native";
import { EmptyState } from "./components/emptyState";
import MovieCard from "./components/movieCard";

export default function WatchlistScreen() {
  const router = useRouter();
  const movies = useWatchlistStore((s) => s.movies);
  const hydrated = useWatchlistStore.persist.hasHydrated();

  if (!hydrated) {
    return <ActivityIndicator className="mt-10" />;
  }

  //   if (movies.length === 0) {
  //     return <EmptyState message="No movies saved yet 🎬" />;
  //   }

  return (
    <SafeArea>
      <StatusBar style="light" />
      <View className="w-full h-12  flex-row items-center px-3">
        <Button
          rounded="pill"
          type={"ghost"}
          onPress={() => router.back()}
          icon={<AntDesign name="arrow-left" size={24} color={"#FFFFFF"} />}
        />
      </View>

      <View className="flex-1 mt-5 mx-2">
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieCard movie={item} />}
          ListEmptyComponent={
            <EmptyState
              title={"Your watch-list is empty"}
              description={"Add movies to your watch-list to see them here."}
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
        />
      </View>
    </SafeArea>
  );
}
