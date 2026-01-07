import type React from "react";
import { Pressable, Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: React.ReactNode;

  /** Optional call-to-action */
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration,
  actionLabel,
  onAction,
}) => {
  const showAction = Boolean(actionLabel && onAction);

  return (
    <View className="items-center justify-center py-16 px-4">
      <View className="items-center gap-5">
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

        {showAction && (
          <Pressable
            onPress={onAction}
            className="mt-2 px-5 py-2 rounded-full border border-netflix-red"
            android_ripple={{ color: "rgba(229,9,20,0.2)" }}
            accessibilityRole="button"
          >
            <Text className="text-netflix-red font-semibold text-sm">
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
