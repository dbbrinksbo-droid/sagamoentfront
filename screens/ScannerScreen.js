import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Theme from "../theme";
import RoyalHeader from "../components/RoyalHeader";
import GoldButton from "../components/GoldButton";
import GoldCard from "../components/GoldCard";
import SagaText from "../components/SagaText";
import LoadingOverlay from "../components/LoadingOverlay";

// *** KORREKT IMPORT (VIGTIG) ***
import { analyzeCoinV12 as analyzeCoin } from "../services/ai/CoinAnalyzer";

export default function ScannerScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Ingen adgang", "Kamera-adgang kræves for at scanne.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (result.canceled) return;
    setImage(result.assets[0].uri);
  };

  const handleAnalyze = async () => {
    if (!image) {
      Alert.alert("Ingen billede", "Tag eller vælg et billede først.");
      return;
    }

    try {
      setLoading(true);

      // KORREKT ANALYSE-FLOW
      const result = await analyzeCoin(image);

      setLoading(false);

      navigation.navigate("Result", { result });
    } catch (err) {
      setLoading(false);
      console.log("AI ERR:", err);
      Alert.alert("Fejl", "Analysen mislykkedes.");
    }
  };

  return (
    <View style={Theme.container}>
      <RoyalHeader title="Scanner" />

      <ScrollView contentContainerStyle={styles.content}>
        <GoldCard>
          <SagaText style={styles.title}>Scan din mønt</SagaText>

          <View style={styles.previewBox}>
            {image ? (
              <Image source={{ uri: image }} style={styles.preview} />
            ) : (
              <SagaText style={styles.placeholder}>Intet billede valgt</SagaText>
            )}
          </View>

          <GoldButton label="Tag Foto" onPress={takePhoto} />
          <GoldButton label="Vælg fra Galleri" onPress={pickFromGallery} />
          <GoldButton label="Analyser Mønt" onPress={handleAnalyze} />
        </GoldCard>
      </ScrollView>

      <LoadingOverlay visible={loading} text="Analyserer mønt..." />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center",
  },
  previewBox: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    opacity: 0.4,
  },
});

