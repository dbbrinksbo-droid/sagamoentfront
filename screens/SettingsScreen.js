// screens/SettingsScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";

import { API_URL } from "../services/config";
import { getAllCoins } from "../services/db/coinStorage";
import * as FileSystem from "expo-file-system";

export default function SettingsScreen() {
  const [testing, setTesting] = useState(false);

  async function testBackend() {
    try {
      setTesting(true);
      const res = await fetch(API_URL);
      const json = await res.json();
      setTesting(false);

      Alert.alert("Backend OK", JSON.stringify(json, null, 2));
    } catch (e) {
      setTesting(false);
      Alert.alert("Fejl", "Kan ikke kontakte backend.");
    }
  }

  async function clearCollection() {
    Alert.alert("Ryd Samling", "Sikker?", [
      { text: "Nej" },
      {
        text: "Ja",
        onPress: async () => {
          await FileSystem.deleteAsync(
            FileSystem.documentDirectory + "SQLite/sagamoent.db",
            { idempotent: true }
          );
          Alert.alert("OK", "Samling slettet.");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>Indstillinger</SagaText>

      <RoyalDivider />

      <SagaText style={styles.label}>Backend URL:</SagaText>
      <SagaText style={styles.value}>{API_URL}</SagaText>

      <GoldButton
        title={testing ? "Tester..." : "Test Backend"}
        onPress={testBackend}
        style={styles.btn}
      />

      <GoldButton
        title="Ryd Samling"
        onPress={clearCollection}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  label: { opacity: 0.7, marginBottom: 4 },
  value: { marginBottom: 16, fontSize: 14 },
  btn: { marginVertical: 10 },
});

