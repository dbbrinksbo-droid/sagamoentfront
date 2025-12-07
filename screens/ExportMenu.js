// ExportMenu.js – SagaMoent Export System (Royal Gold Edition)

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Theme from "../theme";
import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaSection from "../components/SagaSection";
import Icons from "../theme/Icons";

export default function ExportMenu({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <SagaSection title="Eksporter Samling" />

      <GoldCard style={styles.card}>
        <SagaText variant="h2" center>
          Vælg Eksport Metode
        </SagaText>

        <SagaText center variant="small" style={{ marginTop: 10, opacity: 0.7 }}>
          Eksporter dine mønter i forskellige formater
        </SagaText>
      </GoldCard>

      {/* 1 — Eksporter ALT */}
      <GoldButton
        title="Eksporter ALT (ZIP)"
        icon={Icons.export}
        style={styles.button}
        onPress={() => navigation.navigate("ZipExportScreen")}
      />

      {/* 2 — Eksporter PDF-certifikater */}
      <GoldButton
        title="Eksporter PDF Certifikater"
        icon={Icons.pdf}
        style={styles.button}
        onPress={() => navigation.navigate("PdfExportScreen")}
      />

      {/* 3 — Eksporter JSON + billeder (dataset) */}
      <GoldButton
        title="Eksporter JSON + Billeder (Dataset)"
        icon={Icons.dataset}
        style={styles.button}
        onPress={() => navigation.navigate("DatasetExportScreen")}
      />

      {/* 4 — Eksporter udvalgt mønt */}
      <GoldButton
        title="Eksporter én mønt"
        icon={Icons.coin}
        style={styles.button}
        onPress={() => navigation.navigate("SingleExportChooseScreen")}
      />

      {/* 5 — Del via systemets share sheet */}
      <GoldButton
        title="Del via Email / AirDrop / iCloud"
        icon={Icons.share}
        style={styles.button}
        onPress={() => navigation.navigate("ShareExportScreen")}
      />

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// -------------------------------------------------------
// STYLES
// -------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.sizes.paddingLarge,
  },

  card: {
    marginBottom: 20,
    paddingVertical: 20,
  },

  button: {
    marginBottom: 18,
  },
});

