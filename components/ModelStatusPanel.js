import React from "react";
import { View, StyleSheet } from "react-native";
import GoldCard from "./GoldCard";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function ModelStatusPanel({ status }) {
  return (
    <GoldCard style={styles.card}>
      <SagaText variant="subtitle" style={{ marginBottom: 6 }}>
        AI Model Status
      </SagaText>

      <SagaText variant="small">
        Version: {status.version}
      </SagaText>

      <SagaText variant="small">
        Billeder: {status.datasetCount}
      </SagaText>

      <SagaText variant="small">
        Accuracy: {status.accuracy}%
      </SagaText>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 16,
  },
});
