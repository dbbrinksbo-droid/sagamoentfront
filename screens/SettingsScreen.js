// screens/SettingsScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import { API_URL } from "../services/api";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <SagaText variant="title">Indstillinger</SagaText>

      <SagaText style={{ marginTop: 20 }}>
        Backend server:
      </SagaText>
      <SagaText style={{ opacity: 0.7 }}>{API_URL}</SagaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
});

