import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalHeader from "../components/RoyalHeader";
import { usePro } from "../services/ProLockService";

export default function PaywallMainScreen({ navigation }) {
  const { unlockPro } = usePro();

  return (
    <View style={styles.container}>
      <RoyalHeader title="SagaMoent PRO" />

      <SagaText style={styles.text}>
        Lås op for alle AI-ekspert funktioner, eksport-værktøjer,
        træningssystem, dataset manager og premium features.
      </SagaText>

      <GoldButton title="Køb PRO (engangsbetaling)" onPress={unlockPro} />

      <GoldButton
        title="Tilbage"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: {
    marginBottom: 30,
    fontSize: 18,
  },
});
