// ShareExportScreen.js – Del samlingen via systemets share sheet
import React from "react";
import { View, StyleSheet } from "react-native";

import SagaSection from "../components/SagaSection";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import Theme from "../theme";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { getCollection } from "../services/CoinsService";

export default function ShareExportScreen() {
  async function handleShare() {
    try {
      const coins = await getCollection();

      const file = FileSystem.cacheDirectory + "SagaMoentCollection.json";

      await FileSystem.writeAsStringAsync(
        file,
        JSON.stringify(coins, null, 2),
        { encoding: "utf8" }
      );

      await Sharing.shareAsync(file);
    } catch (err) {
      alert("Kunne ikke dele samlingen.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaSection title="Del Samling" />
      <SagaText center variant="body">
        Del hele din samling som én JSON-fil via mail, AirDrop, iCloud osv.
      </SagaText>

      <GoldButton
        title="Del samlingen"
        onPress={handleShare}
        style={{ marginTop: 30 }}
      />
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

