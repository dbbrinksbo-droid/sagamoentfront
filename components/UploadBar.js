// components/UploadBar.js
import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function UploadBar({ progress = 0, label = "Uploader..." }) {
  const pct = Math.max(0, Math.min(progress, 100));

  return (
    <View style={styles.wrapper}>
      <SagaText size={14} center>{label}</SagaText>

      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${pct}%` }]} />
      </View>

      <SagaText size={12} center style={{ marginTop: 3 }}>
        {pct.toFixed(0)}%
      </SagaText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  barOuter: {
    width: "100%",
    height: 10,
    backgroundColor: "#222",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  barInner: {
    height: "100%",
    backgroundColor: Theme.colors.gold,
  },
});

