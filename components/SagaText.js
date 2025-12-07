import React from "react";
import { Text } from "react-native";
import Theme from "../theme";

export default function SagaText({
  children,
  variant = "body",
  center = false,
  style,
}) {
  const typography = Theme?.typography || {};

  // PREMIUM: Udvidet variant-system
  const customVariants = {
    gold: {
      color: Theme.colors.gold,
      fontWeight: "600",
    },
    danger: {
      color: "#cc3333",
      fontWeight: "600",
    },
    button: {
      fontSize: 18,
      fontWeight: "700",
      color: Theme.colors.textPrimary,
    },
    caption: {
      fontSize: 13,
      color: Theme.colors.textSecondary,
    },
  };

  // vælg variant fra theme -> custom -> fallback
  const selectedStyle =
    typography[variant] ||
    customVariants[variant] ||
    typography.body ||
    { fontSize: 16, color: "#fff" };

  return (
    <Text
      style={[
        selectedStyle,
        center && { textAlign: "center" },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

