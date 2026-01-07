import { Text } from "@/components/base";
import { useWatchlistStore } from "@/store/watchlist.store";
import { Movie } from "@/types/movies";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const addMovie = useWatchlistStore((s) => s.addMovie);
  const removeMovie = useWatchlistStore((s) => s.removeMovie);
  const movies = useWatchlistStore((s) => s.movies);

  /**
   * useMemo → avoid recalculating on every render
   */
  const isSaved = useMemo(
    () => movies.some((m) => m.imdbID === movie.imdbID),
    [movies, movie.imdbID]
  );

  /**
   * useCallback → stable function reference
   */
  const handlePress = useCallback(() => {
    isSaved ? removeMovie(movie.imdbID) : addMovie(movie);
  }, [isSaved, movie, addMovie, removeMovie]);

  return (
    <View className="flex-row mb-4 p-1 ">
      <View className="w-20 h-28 bg-gray-300 rounded-md overflow-hidden">
        <Image
          source={{
            uri: movie.Poster
              ? movie.Poster
              : "https://placehold.co/300x450/141414/E50914?text=No+Image",
          }}
          contentFit="cover"
          cachePolicy="memory-disk" // Cache images in memory and disk
          alt="Product Image"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View className="flex-1 ml-3 gap-3">
        <View className="flex-row justify-between items-center">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="font-semibold text-white w-[250px]"
          >
            {movie.Title}
          </Text>

          <AntDesign
            name="heart"
            size={20}
            color={isSaved ? "#E50914" : "#B3B3B3"}
          />
        </View>

        <Text className="text-netflix-gray">{movie.Year}</Text>

        <Pressable onPress={handlePress}>
          <Text className="text-blue-500">
            {isSaved ? "Remove" : "Add to Watch-list"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

/**
 * React.memo → prevents re-render unless props change
 */
export default memo(MovieCard);
