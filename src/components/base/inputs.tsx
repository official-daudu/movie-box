import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useId, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { twMerge } from "tailwind-merge";

export const inputVariants = {
  plain: {
    label: "text-[#2C2C2E]",
    bg: "bg-white",
    bgFocused: "bg-white",
    border: "border-[#EAEAEA]",
    text: "text-[#414141]",
    placeholder: "#7B7B7B",
    icon: "text-[#7B7B7B]",
  },
  outline: {
    label: "text-[#101928]",
    bg: "bg-transparent",
    bgFocused: "bg-transparent",
    border: "border-[#EAEAEA]",
    text: "text-[#101928]",
    placeholder: "#969696",
    icon: "text-[#7B7B7B]",
  },
} as const;

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: keyof typeof inputVariants;
  dynamicHeight?: boolean;
  className?: string;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Input({
  label,
  error,
  icon,
  rightIcon,
  variant = "plain",
  dynamicHeight,
  className,
  ...props
}: InputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const v = inputVariants[variant];

  return (
    <View className="w-full gap-1">
      {label && (
        <Text className={twMerge("text-sm font-medium", v.label)}>{label}</Text>
      )}

      <View
        className={twMerge(
          "flex-row items-center border rounded-lg px-3",
          focused ? v.bgFocused : v.bg,
          v.border,
          error && "border-red-500"
        )}
      >
        {icon}

        <TextInput
          className={twMerge(
            "flex-1 min-h-[48px] px-2 font-avenir",
            v.text,
            className
          )}
          placeholderTextColor={v.placeholder}
          multiline={dynamicHeight}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {rightIcon}
      </View>

      {error && (
        <Text className="text-xs font-medium text-red-500">
          {capitalize(error)}
        </Text>
      )}
    </View>
  );
}

export function SearchInput(props: InputProps) {
  return (
    <View className="flex-row items-center gap-2 bg-white border rounded-full px-4">
      <MaterialIcons name="search" size={22} color="#667185" />
      <TextInput
        className="flex-1 py-3 text-[#667185]"
        placeholder="Search"
        placeholderTextColor="#667185"
        {...props}
      />
    </View>
  );
}

export function HomeSearchInput({ rightIcon, ...props }: InputProps) {
  return (
    <View className="flex-row items-center gap-2 h-14 bg-white border border-white rounded-lg px-4">
      <MaterialIcons name="search" size={22} color="#667185" />
      <TextInput
        className="flex-1 py-3 text-[#667185]"
        placeholder="Search"
        {...props}
      />
      {rightIcon}
    </View>
  );
}
