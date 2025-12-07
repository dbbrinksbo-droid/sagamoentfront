// screens/HomeScreen.js — V12 Royal Edition

import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import Theme from "../theme";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      <SagaText
        center
        size={32}
        weight="bold"
        style={{ color: Theme.colors.gold, marginBottom: 20 }}
      >
        SagaMoent
      </SagaText>

      <Image
        source={require("../assets/branding/saga-icon.png")}
        style={styles.logo}
      />

      <View style={{ marginTop: 30 }}>
        <GoldButton
          title="🔍 Scan en mønt"
          onPress={() => navigation.navigate("Scanner")}
          style={{ marginBottom: 16 }}
        />

        <GoldButton
          title="📁 Samling"
          onPress={() => navigation.navigate("Collection")}
          style={{ marginBottom: 16 }}
        />

        <GoldButton
          title="🧠 AI Træner"
          onPress={() => navigation.navigate("AiTrainer")}
          style={{ marginBottom: 16 }}
        />

        <GoldButton
          title="🗂 Dataset"
          onPress={() => navigation.navigate("Dataset")}
          style={{ marginBottom: 16 }}
        />

        <GoldButton
          title="📤 Eksport"
          onPress={() => navigation.navigate("ExportMenu")}
          style={{ marginBottom: 16 }}
        />

        <GoldButton
          title="⚙️ Indstillinger"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 10,
    opacity: 0.95,
  },
});

