import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalHeader from "../components/RoyalHeader";
import { useTheme } from "../theme/ThemeService";

export default function ResultScreen({ route, navigation }) {
  const theme = useTheme();
  const { result, front, back } = route.params;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <RoyalHeader title="AI Resultat" />

      <Image source={{ uri: front }} style={styles.img} />

      {back && <Image source={{ uri: back }} style={styles.img} />}

      <View style={styles.card}>
        <SagaText style={styles.label}>{result.label_name}</SagaText>
        <SagaText>Sikkerhed: {(result.confidence * 100).toFixed(1)}%</SagaText>
        <SagaText>OCR: {result.ocr_text}</SagaText>
      </View>

      {result.metadata && (
        <View style={styles.card}>
          {Object.entries(result.metadata).map(([k, v]) => (
            <SagaText key={k}>{k}: {v}</SagaText>
          ))}
        </View>
      )}

      <GoldButton
        title="Gem til samling"
        onPress={() => navigation.navigate("SaveCoinScreen", { result, front, back })}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    width: "100%",
    height: 230,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 14,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
});
