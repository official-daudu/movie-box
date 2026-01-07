import React from "react";
import { Keyboard, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaProps = React.ComponentProps<typeof SafeAreaView> & {
  keyboardDismiss?: boolean;
};

export const SafeArea = React.forwardRef<
  React.ComponentRef<typeof SafeAreaView>,
  SafeAreaProps
>(({ keyboardDismiss, className, ...props }, ref) => {
  const Content = (
    <SafeAreaView
      ref={ref}
      edges={["top"]}
      className={["flex-1 bg-[#141414]", className].filter(Boolean).join(" ")}
      {...props}
    />
  );

  if (!keyboardDismiss) {
    return Content;
  }

  return (
    <Pressable className="flex-1" onPress={Keyboard.dismiss}>
      {Content}
    </Pressable>
  );
});
