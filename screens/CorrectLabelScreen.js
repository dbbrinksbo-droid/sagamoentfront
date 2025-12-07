// CorrectLabelScreen.js – SagaMoent Optimized Edition
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, TextInput } from "react-native";

import Theme from "../theme";
import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaSection from "../components/SagaSection";
import Icons from "../theme/Icons";

export default function CorrectLabelScreen({ navigation, route }) {
  // Vi modtager en komplet profil eller et raw AI-resultat
  const { aiResult, image, originalLabel } = route.params || {};

  const [label, setLabel] = useState(originalLabel || aiResult?.label || "");

  return (
    <ScrollView style={styles.container}>
      <SagaSection title="Forbedr AI-resultat" />

      <GoldCard style={{ paddingVertical: 22 }}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : null}

        <SagaText center variant="subtitle" style={{ marginTop: 10 }}>
          AI foreslog: {originalLabel || aiResult?.label || "Ukendt"}
        </SagaText>

        <SagaText center variant="small" style={{ opacity: 0.7 }}>
          Ret møntens korrekte navn / type
        </SagaText>

        {/* INPUT FELT */}
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="Skriv korrekt mønt-type…"
          placeholderTextColor="#888"
        />
      </GoldCard>

      {/* GODKEND */}
      <GoldButton
        title="Gem korrekt label"
        icon={Icons.check}
        onPress={() =>
          navigation.navigate("AiTrainerScreen", {
            corrected: label,
            original: aiResult?.label,
          })
        }
        style={{ marginTop: 20 }}
      />

      {/* FEJL MARKERING */}
      <GoldButton
        title="Marker som fejl"
        icon={Icons.error}
        onPress={() =>
          navigation.navigate("AiTrainerScreen", {
            corrected: "FEJL",
            original: aiResult?.label,
          })
        }
        style={{ marginTop: 15, marginBottom: 40 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.sizes.paddingLarge,
    backgroundColor: Theme.colors.background,
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.goldFaded,
  },
  input: {
    marginTop: 20,
    backgroundColor: Theme.colors.surfaceLight,
    padding: 12,
    borderRadius: 10,
    color: Theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: Theme.colors.goldFaded,
  },
});

