import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Theme from "../theme";

export default function GoldenImageFrame({ source, size = 160 }) {
  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Image source={{ uri: source }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: Theme.colors.gold,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Theme.colors.surfaceLight,
    shadowColor: Theme.colors.gold,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
});
