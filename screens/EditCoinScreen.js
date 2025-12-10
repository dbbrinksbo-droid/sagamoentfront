import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import GoldInput from "../components/GoldInput";
import { updateCoin } from "../services/CoinsService";

export default function EditCoinScreen({ route, navigation }) {
  const { coin } = route.params;

  const [valueMin, setValueMin] = useState(coin.valueMin?.toString() ?? "");
  const [valueMax, setValueMax] = useState(coin.valueMax?.toString() ?? "");
  const [notes, setNotes] = useState(coin.notes ?? "");

  async function save() {
    await updateCoin({
      id: coin.id,
      valueMin: parseFloat(valueMin) || 0,
      valueMax: parseFloat(valueMax) || 0,
      valueAvg: ((parseFloat(valueMin) || 0) + (parseFloat(valueMax) || 0)) / 2,
      notes,
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>Rediger mønt</SagaText>

      <GoldInput placeholder="Minimumværdi" value={valueMin} onChangeText={setValueMin} />
      <GoldInput placeholder="Maksimumværdi" value={valueMax} onChangeText={setValueMax} />
      <GoldInput placeholder="Noter" value={notes} onChangeText={setNotes} multiline />

      <GoldButton title="Gem ændringer" onPress={save} style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 20 },
});
