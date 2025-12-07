// PdfExportScreen.js – SagaMoent PDF Export UI
import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import SagaSection from "../components/SagaSection";
import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";
import Theme from "../theme";

import { generateAllPDFs } from "../services/PDFService";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function PdfExportScreen() {
  const [loading, setLoading] = useState(false);

  async function handleGeneratePDFs() {
    try {
      setLoading(true);

      // Generér alle PDF'er
      const pdfs = await generateAllPDFs();

      // Lav en samlet mappe (simple metode)
      const tempFolder = FileSystem.cacheDirectory + "SagaMoentPDFs/";
      await FileSystem.makeDirectoryAsync(tempFolder, { intermediates: true });

      for (const file of pdfs) {
        await FileSystem.copyAsync({
          from: file.path,
          to: `${tempFolder}cert_${file.id}.pdf`,
        });
      }

      await Sharing.shareAsync(tempFolder);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Fejl ved PDF eksport.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaSection title="Eksporter PDF Certifikater" />

      <SagaText center variant="body">
        Der genereres et PDF-certifikat for hver mønt i din samling.
      </SagaText>

      <GoldButton
        title={loading ? "Genererer..." : "Lav alle PDF'er"}
        onPress={handleGeneratePDFs}
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

