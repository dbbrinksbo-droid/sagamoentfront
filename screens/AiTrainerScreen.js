import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";

import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaSection from "../components/SagaSection";
import FadeInView from "../components/FadeInView";
import Icons from "../theme/Icons";
import Theme from "../theme";

export default function AiTrainerScreen({ navigation, route }) {
  const corrected = route.params?.corrected;

  return (
    <ScrollView style={styles.container}>
      <SagaSection title="AI Træning" />

      <GoldCard>
        <Image source={Icons.coin} style={styles.iconBig} />
        <SagaText center variant="body" style={{ marginTop: 8 }}>
          Brug korrekt mærkning til at forbedre modellen
        </SagaText>
      </GoldCard>

      {corrected && (
        <FadeInView duration={600}>
          <GoldCard style={{ marginTop: 20 }}>
            <SagaText center variant="gold">
              NY KORREKT LABEL:
            </SagaText>
            <SagaText center variant="subtitle">{corrected}</SagaText>
          </GoldCard>
        </FadeInView>
      )}

      <GoldButton
        title="Importer datasæt"
        icon={Icons.import}
        onPress={() => navigation.navigate("DatasetScreen")}
        style={styles.btn}
      />

      <GoldButton
        title="Start træning"
        icon={Icons.tree}
        onPress={() => navigation.navigate("CorrectScreen")}
        style={styles.btn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.sizes.paddingLarge,
    backgroundColor: Theme.colors.background,
  },
  iconBig: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  btn: {
    marginTop: 20,
  },
});

