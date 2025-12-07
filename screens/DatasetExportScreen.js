// DatasetExportScreen.js – Eksporter JSON + billeder (AI dataset)
import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import SagaText from "../components/SagaText";
import SagaSection from "../components/SagaSection";
import GoldButton from "../components/GoldButton";
import Theme from "../theme";

import { getCollection } from "../services/CoinsService";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function DatasetExportScreen() {
  const [loading, setLoading] = useState(false);

  async function handleExportDataset() {
    try {
      setLoading(true);

      const coins = await getCollection();

      const folder = FileSystem.cacheDirectory + "SagaMoentDataset/";
      await FileSystem.makeDirectoryAsync(folder, { intermediates: true });

      for (const coin of coins) {
        const path = `${folder}coin_${coin.id}.json`;
        await FileSystem.writeAsStringAsync(path, JSON.stringify(coin, null, 2));
      }

      await Sharing.shareAsync(folder);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Fejl ved dataset eksport.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaSection title="Eksporter Dataset" />
      <SagaText center variant="body">
        Eksporter alle mønter som rå JSON-filer + base64 billeder (AI træning).
      </SagaText>

      <GoldButton
        title={loading ? "Eksporterer…" : "Eksporter Dataset"}
        onPress={handleExportDataset}
        style={{ marginTop: 30 }}
      />

      {loading && (
        <ActivityIndicator size="large" color={Theme.colors.gold} style={{ marginTop: 20 }} />
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

