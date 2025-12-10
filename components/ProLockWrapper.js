// components/ProLockWrapper.js
import React from "react";
import { View } from "react-native";
import GoldButton from "./GoldButton";
import SagaText from "./SagaText";
import { usePro } from "../services/ProLockService";

export default function ProLockWrapper({ children, navigation }) {
  const { isPro } = usePro();

  if (isPro) return children;

  return (
    <View style={{ padding: 20 }}>
      <SagaText style={{ fontSize: 20, marginBottom: 10 }}>
        Denne funktion kræver SagaMoent PRO
      </SagaText>

      <GoldButton
        title="Lås op for PRO"
        onPress={() => navigation.navigate("Paywall")}
      />
    </View>
  );
}
