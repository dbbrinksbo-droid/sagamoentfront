// screens/ScannerScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import LoadingOverlay from "../components/LoadingOverlay";
import { analyzeFull } from "../services/api";

export default function ScannerScreen({ navigation }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------
  // Tag billede (front/back)
  // --------------------------------------------
  async function takePhoto(side) {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Ingen adgang", "Du skal give adgang til kamera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: false,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    if (side === "front") setFront(uri);
    if (side === "back") setBack(uri);
  }

  // --------------------------------------------
  // Kør AI-analyse
  // --------------------------------------------
  async function handleAnalyze() {
    if (!front) {
      Alert.alert("Mangler billede", "Tag mindst et frontbillede.");
      return;
    }

    try {
      setLoading(true);

      const result = await analyzeFull(front, back);

      setLoading(false);

      if (!result.success) {
        Alert.alert("Analysefejl", result.error || "Ukendt fejl");
        return;
      }

      // Send resultat videre til ResultScreen
      navigation.navigate("Result", {
        ai: result,
        images: { front, back },
      });
    } catch (err) {
      setLoading(false);
      Alert.alert("Fejl", "Noget gik galt ved analysen.");
    }
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>Scan mønt</SagaText>

      <View style={styles.row}>
        <View style={styles.imageSlot}>
          {front ? (
            <Image source={{ uri: front }} style={styles.img} />
          ) : (
            <SagaText style={styles.placeholder}>Front</SagaText>
          )}
        </View>

        <GoldButton title="Front" onPress={() => takePhoto("front")} />
      </View>

      <View style={styles.row}>
        <View style={styles.imageSlot}>
          {back ? (
            <Image source={{ uri: back }} style={styles.img} />
          ) : (
            <SagaText style={styles.placeholder}>Back (valgfri)</SagaText>
          )}
        </View>

        <GoldButton title="Back" onPress={() => takePhoto("back")} />
      </View>

      <GoldButton
        title="Analyser"
        onPress={handleAnalyze}
        style={{ marginTop: 30 }}
      />

      <LoadingOverlay visible={loading} text="Analyserer mønt…" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  row: {
    marginBottom: 20,
  },
  imageSlot: {
    width: 160,
    height: 160,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 12,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  placeholder: {
    opacity: 0.6,
    fontSize: 16,
  },
});
