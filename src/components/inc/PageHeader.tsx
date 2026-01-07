import { AntDesign } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "./../base/buttons";

type Props = {
  name?: string;
  backButton?: boolean;
  bare?: boolean;
  headerRight?: React.ReactNode;
  backUrl?: Href;
  variant?: "light" | "dark";
  banner?: boolean;
};

export function PageHeader({
  name,
  backButton = false,
  bare = false,
  headerRight,
  backUrl,
  banner,
  variant = "light",
}: Props) {
  const router = useRouter();
  const isLight = variant === "light";

  return (
    <View
      className={[
        "relative flex-row items-center justify-center bg-netflix-black `h-[${52}px]`",
        `h-[${52}px]`,
        bare ? "px-0" : "px-4",
      ].join(" ")}
    >
      {/* LEFT */}
      <View
        className={[
          "absolute left-0 top-0 bottom-0 items-center justify-center",
          bare ? "ml-0" : "ml-2",
        ].join(" ")}
      >
        {backButton && (
          <Button
            rounded="pill"
            type={isLight ? "dark-ghost" : "ghost"}
            onPress={() => {
              backUrl
                ? router.replace(backUrl)
                : router.canGoBack()
                  ? router.back()
                  : router.replace("/");
            }}
            icon={
              <AntDesign
                name="arrow-left"
                size={24}
                color={isLight ? "#111111" : "#FFFFFF"}
              />
            }
          />
        )}
      </View>

      {/* CENTER */}
      <View className="flex-1 mx-8 items-center justify-center pointer-events-none">
        <Text
          numberOfLines={1}
          className={[
            "text-center font-medium text-lg",
            isLight ? "text-black" : "text-white",
          ].join(" ")}
        >
          {name}
        </Text>
      </View>

      {/* RIGHT */}
      <View
        className={[
          "absolute right-0 top-0 bottom-0 items-center justify-center",
          bare ? "mr-0" : "mr-4",
        ].join(" ")}
      >
        {headerRight}
      </View>
    </View>
  );
}
