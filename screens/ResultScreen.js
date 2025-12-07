// screens/ResultScreen.js — V12 Legendary Edition

import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import Theme from "../theme";

import ConfidenceBar from "../components/ConfidenceBar";
import MetadataPanel from "../components/MetadataPanel";

export default function ResultScreen({ route, navigation }) {
  const { result, image_uri } = route.params || {};

  if (!result) {
    return (
      <View style={styles.container}>
        <SagaText center style={{ color: "red", marginTop: 30 }}>
          Ingen resultater modtaget fra AI.
        </SagaText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      {/* Mønt billede */}
      {image_uri && (
        <Image source={{ uri: image_uri }} style={styles.coinImage} />
      )}

      {/* Result boks */}
      <View style={styles.resultBox}>
        <SagaText style={styles.title}>AI Analyse</SagaText>

        {/* Confidence */}
        <ConfidenceBar confidence={result.confidence || 0} />

        {/* Label navn */}
        <SagaText style={styles.labelText}>
          {result.label_name || "Ukendt type"}
        </SagaText>

        {/* OCR årstal */}
        <SagaText style={styles.ocrText}>
          OCR Årstal: {result.ocr_text || "Ikke fundet"}
        </SagaText>

        {/* Metadata panel */}
        <MetadataPanel metadata={result.metadata} />

        {/* Model info */}
        <SagaText style={styles.modelInfo}>
          Model: {result.model_used || "ukendt"}
        </SagaText>
      </View>

      {/* Chat Expert */}
      <GoldButton
        title="Spørg mønteksperten"
        style={{ marginTop: 10 }}
        onPress={() =>
          navigation.navigate("ChatAssistant", {
            ai_metadata: result,
            image_uri,
          })
        }
      />

      {/* Tilbage */}
      <GoldButton
        title="Tilbage"
        style={{ marginTop: 15 }}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  inner: {
    padding: 20,
  },
  coinImage: {
    width: "100%",
    height: 260,
    borderRadius: 14,
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: "#141414",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.gold,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: Theme.colors.gold,
    marginBottom: 14,
    textAlign: "center",
  },
  labelText: {
    fontSize: 18,
    color: Theme.colors.gold,
    textAlign: "center",
    marginTop: 6,
  },
  ocrText: {
    opacity: 0.8,
    textAlign: "center",
    marginTop: 6,
  },
  modelInfo: {
    textAlign: "center",
    marginTop: 12,
    opacity: 0.6,
    fontSize: 12,
  },
});

