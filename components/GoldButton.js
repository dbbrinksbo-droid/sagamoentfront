// components/GoldButton.js — V12 Legendary Edition

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Theme from "../theme";

export default function GoldButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.goldSoft,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.gold,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  text: {
    color: Theme.colors.background,
    fontSize: 18,
    fontWeight: "700",
  },
});

