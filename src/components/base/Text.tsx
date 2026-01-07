import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_STYLES: Record<Size, string> = {
  xs: "text-xs leading-4",
  sm: "text-sm leading-5",
  md: "text-base leading-6",
  lg: "text-lg leading-7",
  xl: "text-xl leading-8",
};

export interface AppTextProps extends TextProps {
  size?: Size;
  className?: string;
}

export const Text: React.FC<AppTextProps> = ({
  size = "md",
  className,
  ...props
}) => {
  return (
    <RNText
      {...props}
      className={twMerge(
        "font-body", // equivalent of fontFamily: "$body"
        SIZE_STYLES[size],
        className
      )}
    />
  );
};
