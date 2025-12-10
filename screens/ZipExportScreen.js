// screens/ZipExportScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";
import Theme from "../theme/Theme";

import { exportFullZip } from "../services/exportZIP";

export default function ZipExportScreen() {
  const [loading, setLoading] = useState(false);

  async function handleZIP() {
    try {
      setLoading(true);
      await exportFullZip();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Fejl", "ZIP eksport mislykkedes.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>ZIP Eksport</SagaText>

      <RoyalDivider />

      <GoldButton
        title={loading ? "Genererer..." : "Lav ZIP"}
        onPress={handleZIP}
        style={styles.btn}
      />

      {loading && (
        <ActivityIndicator size="large" color={Theme.colors.gold} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  btn: { marginBottom: 20 },
});
