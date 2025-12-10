// screens/PdfExportScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";
import RoyalDivider from "../components/RoyalDivider";

import { getAllCoins } from "../services/db/coinStorage";
import { exportCoinsPDF } from "../services/exportPDF";

export default function PdfExportScreen() {
  const [loading, setLoading] = useState(false);

  async function handlePDF() {
    try {
      setLoading(true);

      const coins = await getAllCoins();
      if (!coins.length) {
        Alert.alert("Tom samling", "Der er ingen mønter at eksportere.");
        setLoading(false);
        return;
      }

      await exportCoinsPDF(coins, "royal", "share");

      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert("Fejl", "Kunne ikke lave PDF.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>PDF Eksport</SagaText>
      <RoyalDivider />

      <GoldButton
        title={loading ? "Laver PDF..." : "Lav PDF"}
        onPress={handlePDF}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
});
