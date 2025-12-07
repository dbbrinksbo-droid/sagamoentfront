import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";
import ConfidenceBar from "./ConfidenceBar";

export default function MetadataPanel({ result }) {
  if (!result) return null;

  const confidence = result?.confidence || 0;
  const ocr = result?.ocr_text || "";
  const year = result?.metadata?.year || result.year || "Ukendt";
  const country = result?.metadata?.country || "Ukendt";
  const type = result?.metadata?.type || "Ukendt";

  return (
    <View style={styles.box}>
      <SagaText size={20} weight="bold" style={styles.title}>
        SagaMoent Analyse
      </SagaText>

      <ConfidenceBar value={confidence} />

      <SagaText size={14} style={styles.item}>
        <SagaText weight="bold">Årstal:</SagaText> {year}
      </SagaText>

      <SagaText size={14} style={styles.item}>
        <SagaText weight="bold">Land:</SagaText> {country}
      </SagaText>

      <SagaText size={14} style={styles.item}>
        <SagaText weight="bold">Type:</SagaText> {type}
      </SagaText>

      {ocr ? (
        <SagaText size={14} style={styles.item}>
          <SagaText weight="bold">OCR:</SagaText> {ocr}
        </SagaText>
      ) : null}

      {result?.metadata?.description ? (
        <View style={{ marginTop: 14 }}>
          <SagaText weight="bold" size={16} style={{ marginBottom: 4 }}>
            Historisk bemærkning
          </SagaText>
          <SagaText size={14} color={Theme.colors.textSoft}>
            {result.metadata.description}
          </SagaText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#141312",
    padding: 16,
    borderRadius: 16,
    borderColor: Theme.colors.gold,
    borderWidth: 2,
    marginTop: 20,
  },
  title: {
    marginBottom: 12,
    color: Theme.colors.gold,
  },
  item: {
    marginBottom: 6,
  },
});

