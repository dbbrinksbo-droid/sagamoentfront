import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function UploadOverlay({ visible, progress, label }) {
  if (!visible) return null;

  const pct = Math.max(0, Math.min(progress || 0, 100));

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <SagaText size={18} center weight="bold" style={{ marginBottom: 10 }}>
          {label || "Uploader..."}
        </SagaText>

        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${pct}%` }]} />
        </View>

        <SagaText size={14} center style={{ marginTop: 10, color: Theme.colors.gold }}>
          {pct.toFixed(0)}%
        </SagaText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  box: {
    width: "80%",
    backgroundColor: "#111",
    padding: 22,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Theme.colors.gold,
  },
  barOuter: {
    width: "100%",
    height: 12,
    backgroundColor: "#333",
    borderRadius: 6,
    overflow: "hidden",
  },
  barInner: {
    height: "100%",
    backgroundColor: Theme.colors.gold,
  },
});

