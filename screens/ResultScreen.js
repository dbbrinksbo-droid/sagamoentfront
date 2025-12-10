// screens/ResultScreen.js
import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, Alert } from "react-native";
import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";
import RoyalCard from "../components/RoyalCard";
import RoyalDivider from "../components/RoyalDivider";
import LoadingOverlay from "../components/LoadingOverlay";

import { saveCoin } from "../services/db/coinStorage";
import { usePro } from "../services/ProLockService";

export default function ResultScreen({ route, navigation }) {
  const { ai, images } = route.params;
  const { isPro } = usePro();

  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);

    try {
      await saveCoin({
        frontImage: images.front,
        backImage: images.back,
        year: ai.metadata?.year ?? "",
        type: ai.metadata?.type ?? "",
        material: ai.metadata?.metal ?? "",
        regent: ai.metadata?.regent ?? "",
        condition: ai.metadata?.grade ?? "",
        valueDKK: ai.metadata?.valueDKK ?? "",
        errorType: ai.metadata?.error ?? "",
        notes: "",
      });

      Alert.alert("Gemt", "Mønten er gemt i din samling.");
      navigation.navigate("CollectionStack");
    } catch (err) {
      console.log("SAVE ERROR:", err);
      Alert.alert("Fejl", "Kunne ikke gemme mønten.");
    }

    setSaving(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SagaText style={styles.title}>AI Analyse Resultat</SagaText>

        {/* Billeder */}
        <View style={styles.imageRow}>
          <Image
            source={{ uri: images.front }}
            style={styles.preview}
          />
          {images.back && (
            <Image
              source={{ uri: images.back }}
              style={styles.preview}
            />
          )}
        </View>

        <RoyalDivider />

        {/* AI Label */}
        <RoyalCard>
          <SagaText style={styles.label}>
            {ai.label_name ?? "Ukendt mønt"}
          </SagaText>
          <SagaText style={styles.confidence}>
            Sikkerhed: {(ai.confidence * 100).toFixed(1)}%
          </SagaText>
          <SagaText style={styles.metaSmall}>
            Model: {ai.model_used ?? "V12"}
          </SagaText>
        </RoyalCard>

        {/* Metadata */}
        <RoyalCard>
          <SagaText style={styles.metaTitle}>Metadata</SagaText>

          {Object.entries(ai.metadata || {}).map(([key, value]) => (
            <SagaText key={key} style={styles.metaLine}>
              • {key}: {value}
            </SagaText>
          ))}

          {ai.ocr_text ? (
            <SagaText style={styles.metaLine}>• OCR: {ai.ocr_text}</SagaText>
          ) : null}
        </RoyalCard>

        <RoyalDivider />

        {/* ACTION BUTTONS */}
        <GoldButton
          title="Gem i samling"
          onPress={handleSave}
          style={{ marginBottom: 10 }}
        />

        {/* PRO Buttons */}
        <GoldButton
          title="Korriger data (PRO)"
          onPress={() =>
            isPro
              ? navigation.navigate("CorrectLabels", { ai, images })
              : navigation.navigate("Paywall")
          }
          style={{ marginBottom: 10 }}
        />

        <GoldButton
          title="AI Ekspert (PRO)"
          onPress={() =>
            isPro
              ? navigation.navigate("CoinExpert", { ai })
              : navigation.navigate("Paywall")
          }
          style={{ marginBottom: 10 }}
        />

        <GoldButton
          title="Eksporter (PRO)"
          onPress={() =>
            isPro
              ? navigation.navigate("SingleExportChoose", { ai, images })
              : navigation.navigate("Paywall")
          }
        />
      </ScrollView>

      {saving && <LoadingOverlay text="Gemmer..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  preview: {
    width: 140,
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  label: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  confidence: {
    fontSize: 16,
    color: "#D4AF37",
    marginBottom: 6,
  },
  metaTitle: {
    fontSize: 20,
    color: "#D4AF37",
    marginBottom: 10,
  },
  metaLine: {
    marginBottom: 4,
    color: "#eee",
  },
  metaSmall: {
    fontSize: 12,
    color: "#999",
  },
});
