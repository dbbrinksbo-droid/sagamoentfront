import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Theme from "../theme";

export default function GoldInput({ label, value, onChangeText, multiline }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, multiline && { height: 100 }]}
        multiline={multiline}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 18,
  },
  label: {
    color: Theme.colors.textGold,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 10,
    padding: 12,
    color: Theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: Theme.colors.gold,
  },
});
