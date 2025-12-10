// screens/EditCoinScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import GoldInput from "../components/GoldInput";
import RoyalDivider from "../components/RoyalDivider";

import { updateCoin } from "../services/db/coinStorage";

export default function EditCoinScreen({ route, navigation }) {
  const { coin } = route.params;

  const [year, setYear] = useState(coin.year || "");
  const [type, setType] = useState(coin.type || "");
  const [material, setMaterial] = useState(coin.material || "");
  const [regent, setRegent] = useState(coin.regent || "");
  const [condition, setCondition] = useState(coin.condition || "");
  const [valueDKK, setValueDKK] = useState(coin.valueDKK || "");
  const [errorType, setErrorType] = useState(coin.errorType || "");
  const [notes, setNotes] = useState(coin.notes || "");

  const [saving, setSaving] = useState(false);

  // ------------------------------------------------------
  // GEM ÆNDRINGER
  // ------------------------------------------------------
  async function handleSave() {
    try {
      setSaving(true);

      const updated = {
        id: coin.id,
        year,
        type,
        material,
        regent,
        condition,
        valueDKK,
        errorType,
        notes,
      };

      await updateCoin(coin.id, updated);

      setSaving(false);

      Alert.alert("Gemt", "Mønten er opdateret.");
      navigation.goBack();
    } catch (err) {
      setSaving(false);
      Alert.alert("Fejl", "Kunne ikke gemme ændringer.");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <SagaText style={styles.title}>Rediger Mønt</SagaText>

        <RoyalDivider />

        {/* FELTER */}
        <GoldInput label="Årgang" value={year} onChangeText={setYear} />
        <GoldInput label="Type" value={type} onChangeText={setType} />
        <GoldInput label="Metal" value={material} onChangeText={setMaterial} />
        <GoldInput label="Regent" value={regent} onChangeText={setRegent} />
        <GoldInput label="Stand" value={condition} onChangeText={setCondition} />
        <GoldInput
          label="Værdi (DKK)"
          value={valueDKK}
          onChangeText={setValueDKK}
        />
        <GoldInput
          label="Fejltype"
          value={errorType}
          onChangeText={setErrorType}
        />
        <GoldInput
          label="Noter"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <GoldButton
          title={saving ? "Gemmer..." : "Gem ændringer"}
          onPress={handleSave}
          style={{ marginTop: 20 }}
        />

        <GoldButton
          title="Fortryd"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
}

// ------------------------------------------------------
// STYLE
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
});
