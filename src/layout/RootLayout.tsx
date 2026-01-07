import NetInfo from "@react-native-community/netinfo";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import "../../global.css";
import { useFontsLoaded } from "../hooks/use-font-loaded";

enableScreens(true);

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error)) {
        console.error(
          `API Error: ${error.response?.status} ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown Error:", error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isAxiosError(error)) {
        console.error(
          `API Mutation Error: ${error.response?.status} ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown Mutation Error:", error);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

/**
 * ======== COMPONENT ========
 */
function RootLayout() {
  const [fontsLoaded, fontsError] = useFontsLoaded();
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  React.useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }
  WebBrowser.maybeCompleteAuthSession();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />

          {/* <OfflineBanner /> */}
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
export default RootLayout;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
