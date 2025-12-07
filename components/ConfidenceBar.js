import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function ConfidenceBar({ value }) {
  const pct = Math.max(0, Math.min(value || 0, 100));

  return (
    <View style={styles.container}>
      <SagaText size={14} weight="bold" style={{ marginBottom: 4 }}>
        Sikkerhed: {pct.toFixed(1)}%
      </SagaText>

      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  barOuter: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
  },
  barInner: {
    height: "100%",
    backgroundColor: Theme.colors.gold,
  },
});

