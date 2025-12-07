import React from "react";
import { View, StyleSheet } from "react-native";
import Theme from "../theme";

export default function RoyalDivider({ style }) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Theme.colors.borderGold,
    opacity: 0.35,
    marginVertical: 16,
  },
});

