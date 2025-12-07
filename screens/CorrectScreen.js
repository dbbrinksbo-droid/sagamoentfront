// CorrectScreen.js – SagaMoent Royal Gold Edition
import React from "react";
import { View, StyleSheet } from "react-native";

import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaSection from "../components/SagaSection";
import Icons from "../theme/Icons";
import Theme from "../theme";

export default function CorrectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SagaSection title="Korrektur modtaget" />

      <GoldCard style={{ padding: 20 }}>
        <SagaText center variant="gold" style={{ marginBottom: 12 }}>
          Mange tak! ✔
        </SagaText>

        <SagaText center variant="body">
          Din korrektion hjælper SagaMoent AI med at blive mere præcis —
          både for dig og alle fremtidige brugere.
        </SagaText>
      </GoldCard>

      <GoldButton
        title="Tilbage til forsiden"
        icon={Icons.menu}
        onPress={() => navigation.navigate("HomeScreen")}
        style={{ marginTop: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.sizes.paddingLarge,
    backgroundColor: Theme.colors.background,
    flex: 1,
  },
});

