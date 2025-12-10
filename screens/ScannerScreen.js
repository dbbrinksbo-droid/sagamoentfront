import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import { analyzeCoinV18 } from "../services/ai/CoinAnalyzer";
import LoadingOverlay from "../components/LoadingOverlay";
import RoyalHeader from "../components/RoyalHeader";

export default function ScannerScreen({ navigation }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [loading, setLoading] = useState(false);

  async function takePhoto(side) {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      return Alert.alert("Ingen adgang", "Kamera-adgang kræves.");
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (img.canceled) return;

    if (side === "front") setFront(img.assets[0].uri);
    else setBack(img.assets[0].uri);
  }

  async function runAI() {
    if (!front) return Alert.alert("Fejl", "Tag front-billedet først.");

    setLoading(true);

    try {
      const result = await analyzeCoinV18(front, back);

      navigation.navigate("ResultScreen", {
        result,
        front,
        back,
      });
    } catch (err) {
      Alert.alert("AI-fejl", "Kunne ikke analysere mønten.");
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <RoyalHeader title="Scanner" />

      <GoldButton title="Tag FORSIDE" onPress={() => takePhoto("front")} />
      {front && <Image source={{ uri: front }} style={styles.preview} />}

      <GoldButton title="Tag BAGSIDE (valgfrit)" onPress={() => takePhoto("back")} />
      {back && <Image source={{ uri: back }} style={styles.preview} />}

      <GoldButton
        title="Analyser mønt"
        onPress={runAI}
        style={{ marginTop: 20 }}
      />

      <LoadingOverlay visible={loading} text="Analyserer mønt..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginVertical: 10,
  },
});
