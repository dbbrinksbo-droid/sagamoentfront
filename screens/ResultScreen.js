// screens/ResultScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";
import GoldCard from "../components/GoldCard";
import LoadingOverlay from "../components/LoadingOverlay";

import { saveCoinToCollection } from "../services/db/coinStorage"; // hvis du bruger SQLite
// alternativ: import { saveCoin } from "../services/CoinsService";

export default function ResultScreen({ route, navigation }) {
  const { ai, images } = route.params;

  const [saving, setSaving] = useState(false);

  const {
    label_name,
    confidence,
    year,
    ocr,
    metadata,
    raw,
  } = ai || {};

  const front = images?.front || null;
  const back = images?.back || null;

  // ------------------------------------------------------
  // GEM MØNT I SAMLING
  // ------------------------------------------------------
  async function handleSave() {
    try {
      setSaving(true);

      const coin = {
        frontImage: front,
        backImage: back,
        year: year || metadata?.year || "Ukendt",
        type: metadata?.type || label_name || "Ukendt",
        material: metadata?.metal || "Ukendt",
        regent: metadata?.regent || "Ukendt",
        condition: metadata?.grade || "N/A",
        valueDKK: metadata?.valueDKK || "N/A",
        errorType: metadata?.error || "Ingen",
        notes: metadata?.notes || "",
      };

      await saveCoinToCollection(coin);

      setSaving(false);
      Alert.alert("Gemt", "Mønten er gemt i din samling.");
      navigation.navigate("Collection");
    } catch (e) {
      setSaving(false);
      Alert.alert("Fejl", "Kunne ikke gemme mønten.");
    }
  }

  // ------------------------------------------------------
  // UI FOR RESULTSCREEN
  // ------------------------------------------------------
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SagaText style={styles.title}>AI Analyse Resultat</SagaText>
        
        {/* BILLEDER */}
        <View style={styles.imageRow}>
          {front && (
            <Image source={{ uri: front }} style={styles.image} />
          )}
          {back && (
            <Image source={{ uri: back }} style={styles.image} />
          )}
        </View>

        <RoyalDivider />

        {/* AI RESULT INFO */}
        <GoldCard>
          <SagaText style={styles.label}>Fundet mønt:</SagaText>
          <SagaText style={styles.value}>{label_name}</SagaText>

          <SagaText style={styles.label}>Sikkerhed:</SagaText>
          <SagaText style={styles.value}>{Math.round(confidence * 100)}%</SagaText>

          <SagaText style={styles.label}>År:</SagaText>
          <SagaText style={styles.value}>{year || metadata?.year || "Ukendt"}</SagaText>

          {ocr ? (
            <>
              <SagaText style={styles.label}>OCR:</SagaText>
              <SagaText style={styles.value}>{ocr}</SagaText>
            </>
          ) : null}

          <SagaText style={styles.label}>Metadata:</SagaText>
          <SagaText style={styles.value}>
            {JSON.stringify(metadata, null, 2)}
          </SagaText>
        </GoldCard>

        <RoyalDivider />

        {/* KNAPPER */}
        <GoldButton
          title="Gem i samling"
          onPress={handleSave}
          style={{ marginTop: 20 }}
        />

        <GoldButton
          title="Scan igen"
          onPress={() => navigation.navigate("Scanner")}
          style={{ marginTop: 10 }}
        />

        <GoldButton
          title="PDF / Eksport (Kommer)"
          onPress={() => Alert.alert("Under udvikling", "PDF kommer i V13+")}
          style={{ marginTop: 10 }}
        />

      </ScrollView>

      <LoadingOverlay visible={saving} text="Gemmer mønt…" />
    </View>
  );
}

// ------------------------------------------------------
// STYLE
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    opacity: 0.7,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
});
