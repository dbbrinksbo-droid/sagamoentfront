import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Theme from "../theme";
import SagaText from "./SagaText";

export default function FormField({ label, value, onChange, placeholder }) {
  return (
    <View style={styles.wrapper}>
      <SagaText variant="small" style={styles.label}>{label}</SagaText>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={Theme.colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Theme.sizes.paddingMedium },
  label: { marginBottom: 6 },
  input: {
    backgroundColor: Theme.colors.surfaceLight,
    padding: 12,
    borderRadius: 10,
    color: Theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
});
