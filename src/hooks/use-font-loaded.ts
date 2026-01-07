import { useFonts } from "expo-font";
import { useEffect } from "react";

/**
 * Custom hook to load fonts and handle font loading state.
 * @returns {[boolean, Error]} An array containing two elements:
 * - `fontsLoaded`: A boolean indicating whether fonts are loaded successfully.
 * - `fontsError`: An error object if there was an issue loading fonts.
 */
export const useFontsLoaded = () => {
  const [fontsLoaded, fontsError] = useFonts({
    interLight: require("@/assets/fonts/inter/Light.ttf"),
    inter: require("@/assets/fonts/inter/Regular.ttf"),
    interMedium: require("@/assets/fonts/inter/Medium.ttf"),
    interSemiBold: require("@/assets/fonts/inter/SemiBold.ttf"),
    interBold: require("@/assets/fonts/inter/Bold.ttf"),
  });

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);
  return [fontsLoaded, fontsError];
};
