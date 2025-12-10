// screens/ScannerScreen.js
import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";
import LoadingOverlay from "../components/LoadingOverlay";

import { analyzeFullCoin } from "../services/FullCoinAI";
import { optimizeImage } from "../utils/imageOptimizer";

export default function ScannerScreen({ navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function takePhoto(side) {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Kamera nægtet", "Du skal give adgang til kamera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (result.canceled) return;

    const { uri, base64 } = await optimizeImage(result.assets[0].uri);

    if (side === "front") setFrontImage({ uri, base64 });
    else setBackImage({ uri, base64 });
  }

  async function runAI() {
    if (!frontImage) {
      Alert.alert("Manglende billede", "Tag et billede af forsiden først.");
      return;
    }

    setLoading(true);

    try {
      const ai = await analyzeFullCoin(
        frontImage.uri,
        backImage ? backImage.uri : null
      );

      navigation.navigate("Result", {
        ai,
        images: {
          front: frontImage.uri,
          back: backImage?.uri ?? null,
        },
      });
    } catch (err) {
      Alert.alert("AI-fejl", "Analysering mislykkedes.");
      console.log("AI error:", err);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>SagaMoent Scanner</SagaText>

      <View style={styles.previewRow}>
        <Image
          source={
            frontImage
              ? { uri: frontImage.uri }
              : require("../assets/scan.png")
          }
          style={styles.preview}
        />

        <Image
          source={
            backImage
              ? { uri: backImage.uri }
              : require("../assets/scan.png")
          }
          style={styles.preview}
        />
      </View>

      <GoldButton
        title="Tag forside"
        onPress={() => takePhoto("front")}
        style={{ marginBottom: 10 }}
      />

      <GoldButton
        title="Tag bagside (valgfrit)"
        onPress={() => takePhoto("back")}
        style={{ marginBottom: 20 }}
      />

      <GoldButton
        title="Analyser mønt"
        onPress={runAI}
        disabled={!frontImage}
      />

      {loading && <LoadingOverlay text="Analyserer..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#D4AF37",
    marginBottom: 20,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  preview: {
    width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
});
