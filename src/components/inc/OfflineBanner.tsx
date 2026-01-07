import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect, useMemo, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Text } from "../base";

/** Tunables */
const SHOW_MS = 250; // slide-in speed
const HIDE_MS = 250; // slide-out speed
const ONLINE_VISIBILITY_MS = 1600; // how long "Back online" stays visible

/** Brand/status colors */
const COLOR_OFFLINE = "#CB1A14";
const COLOR_ONLINE = "#2BA640";
const COLOR_NEUTRAL = "#264BAD";

export function OfflineBanner() {
  const { isInternetReachable } = useNetInfo();
  const insets = useSafeAreaInsets();

  // Height of the banner (includes a bit of bottom inset so it clears system UI)
  const bannerHeight = useMemo(
    () => 24 + Math.max(0, insets.bottom / 2),
    [insets.bottom]
  );

  // Drive animation with a single "open" shared value (0 → hidden, 1 → fully shown)
  const open = useSharedValue(0);
  // Separate shared value for color stage: 0 (neutral), 1 (offline red), 2 (online green)
  const colorStage = useSharedValue<0 | 1 | 2>(0);

  // Avoid showing a "Back online" flash on first mount when already online
  const didMount = useRef(false);
  const wasOffline = useRef(false);

  // Derive "state" safely; netinfo can be null/undefined at first
  const offline = isInternetReachable === false;
  const unknown = isInternetReachable == null;

  useEffect(() => {
    // On first render we only react if we're offline; otherwise stay hidden/neutral.
    if (!didMount.current) {
      didMount.current = true;
      if (offline) {
        colorStage.value = 1; // offline red
        open.value = withTiming(1, {
          duration: SHOW_MS,
          easing: Easing.out(Easing.quad),
        });
        wasOffline.current = true;
      }
      return;
    }

    // While reachability is unknown, do nothing.
    if (unknown) return;

    if (offline) {
      // Transition to visible offline state
      colorStage.value = 1;
      open.value = withTiming(1, {
        duration: SHOW_MS,
        easing: Easing.out(Easing.quad),
      });
      wasOffline.current = true;
    } else {
      // Only show "Back online" if we were previously offline
      if (wasOffline.current) {
        colorStage.value = 2; // green
        open.value = withTiming(1, {
          duration: SHOW_MS,
          easing: Easing.out(Easing.quad),
        });
        // After a moment, slide down and reset back to neutral color
        open.value = withDelay(
          ONLINE_VISIBILITY_MS,
          withTiming(
            0,
            { duration: HIDE_MS, easing: Easing.in(Easing.quad) },
            () => {
              colorStage.value = 0; // neutral once hidden
            }
          )
        );
        wasOffline.current = false;
      }
    }
  }, [offline, unknown, open, colorStage]);

  /** Slide from bottom: translateY interpolates between banner height and 0 */
  const containerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(open.value, [0, 1], [bannerHeight, 0]);
    return {
      transform: [{ translateY }],
    };
  });

  /** Smoothly map colorStage to actual color */
  const colorStyle = useAnimatedStyle(() => {
    // Map discrete stages into a numeric domain for interpolateColor
    const stage = colorStage.value; // 0,1,2
    const bg = interpolateColor(
      stage,
      [0, 1, 2],
      [COLOR_NEUTRAL, COLOR_OFFLINE, COLOR_ONLINE]
    );
    return { backgroundColor: bg };
  });

  // Announce changes for screen readers when visible
  const message = offline ? "No internet connection" : "Back online";

  return (
    <Animated.View
      // Fixed to bottom; pointerEvents 'none' so it never blocks touches when transparent/hidden
      pointerEvents="none"
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(0, insets.bottom * 0.25) },
        containerStyle,
      ]}
      accessibilityLiveRegion={Platform.select({
        android: "polite",
        ios: undefined,
      })}
      accessibilityLabel={message}
      testID="offline-banner"
    >
      <Animated.View
        style={[styles.banner, colorStyle]}
        testID="offline-banner-bg"
      >
        <View style={styles.inner}>
          <Text
            style={{ color: "white", fontWeight: "700", fontSize: 12 }}
            testID="offline-banner-text"
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0, // slides up from bottom
    zIndex: 9999, // stay above content
    elevation: 12, // Android visual stack
  },
  banner: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  inner: {
    minHeight: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
