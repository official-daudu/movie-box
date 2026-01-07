import { forwardRef, memo } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

type ButtonType =
  | "primary"
  | "secondary"
  | "yellow"
  | "grey"
  | "greyBlue"
  | "white"
  | "primary-dull"
  | "blue"
  | "outline"
  | "neutralOutline"
  | "primary-outline"
  | "filled"
  | "ghost"
  | "link"
  | "dark-ghost"
  | "scarlet"
  | "scarletLight"
  | "scarletOutline"
  | "primary-ghost";

type Rounded = "sm" | "md" | "lg" | "pill";

export interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  full?: boolean;
  rounded?: Rounded;
  className?: string;
}

const TYPE_STYLES: Record<ButtonType, string> = {
  primary: "bg-primary border-transparent",
  secondary: "bg-[#151449]",
  yellow: "bg-[#EDC11C]",
  grey: "bg-[#F9FAFB] border border-gray-200",
  greyBlue: "bg-[#EAEEF9] border border-[#F0F2F5]",
  white: "bg-[#F9FAFB]",
  "primary-dull": "bg-[#DDBA2E4D]",
  blue: "bg-blue-600",
  outline: "bg-transparent border border-primary",
  neutralOutline: "bg-transparent border border-[#E7EAEE]",
  "primary-outline": "bg-primary",
  filled: "bg-primary",
  ghost: "bg-transparent",
  link: "bg-transparent",
  "dark-ghost": "bg-transparent",
  scarlet: "bg-red-600",
  scarletLight: "bg-red-50",
  scarletOutline: "bg-red-50 border border-gray-200",
  "primary-ghost": "bg-transparent",
};

const TEXT_STYLES: Record<ButtonType, string> = {
  primary: "text-white",
  secondary: "text-white",
  yellow: "text-white",
  grey: "text-gray-700",
  greyBlue: "text-primary",
  white: "text-primary",
  "primary-dull": "text-white",
  blue: "text-white",
  outline: "text-primary",
  neutralOutline: "text-black",
  "primary-outline": "text-white",
  filled: "text-white",
  ghost: "text-gray-800",
  link: "text-primary",
  "dark-ghost": "text-gray-400",
  scarlet: "text-white",
  scarletLight: "text-red-600",
  scarletOutline: "text-red-600",
  "primary-ghost": "text-primary",
};

const ROUNDED: Record<Rounded, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  pill: "rounded-full",
};

export const Button = memo(
  forwardRef<View, ButtonProps>(function Button(
    {
      children,
      onPress,
      icon,
      loading,
      disabled,
      type = "primary",
      full,
      rounded = "md",
      className,
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={isDisabled}
        className={twMerge(
          "flex-row items-center justify-center gap-2 px-4 h-12",
          TYPE_STYLES[type],
          TEXT_STYLES[type],
          ROUNDED[rounded],
          full && "w-full",
          isDisabled && "opacity-50",
          className
        )}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={type === "filled" ? "#000" : "#fff"}
          />
        ) : (
          icon && <View>{icon}</View>
        )}

        {children && (
          <Text className={twMerge("text-sm font-medium", TEXT_STYLES[type])}>
            {children}
          </Text>
        )}
      </Pressable>
    );
  })
);
