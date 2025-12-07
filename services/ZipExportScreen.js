// ZipExportScreen.js – SagaMoent ZIP Export UI
import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";
import SagaSection from "../components/SagaSection";
import Theme from "../theme";

import { exportFullZip } from "../services/ZipService";

export default function ZipExportScreen() {
  const [loading, setLoading] = useState(false);

  async function handleZip() {
    try {
      setLoading(true);
      await exportFullZip();
      setLoading(false);
      alert("ZIP genereret og klar til deling!");
    } catch (err) {
      setLoading(false);
      alert("Fejl ved ZIP eksport.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaSection title="Eksporter ALT (ZIP)" />

      <SagaText center variant="body">
        Dette laver en ZIP med:
        {"\n"}– JSON profiler
        {"\n"}– Billeder (front/back)
        {"\n"}– Klar til email, AirDrop, iCloud osv.
      </SagaText>

      <GoldButton
        title={loading ? "Genererer..." : "Lav ZIP"}
        onPress={handleZip}
        style={{ marginTop: 30 }}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={Theme.colors.gold}
          style={{ marginTop: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.sizes.paddingLarge,
  },
});

