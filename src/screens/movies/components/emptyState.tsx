import type React from "react";
import { View, Text } from "react-native";

interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration,
}) => {
  return (
    <View className="items-center justify-center py-16">
      <View className="items-center gap-4">
        {illustration && (
          <View className="w-[120px] h-[120px] rounded-xl items-center justify-center">
            {illustration}
          </View>
        )}

        <View className="items-center gap-2 max-w-[280px]">
          <Text className="text-center font-semibold text-lg text-neutral-200">
            {title}
          </Text>

          <Text className="text-center text-sm text-neutral-400 leading-5">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};
