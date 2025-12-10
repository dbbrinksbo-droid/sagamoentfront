// screens/HomeScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import Theme from "../theme/Theme";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={require("../assets/saga-splash.png")}
        style={styles.logo}
      />

      <SagaText style={styles.title}>SagaMoent V12</SagaText>
      <SagaText style={styles.subtitle}>AI • Samling • Eksport</SagaText>

      <GoldButton
        title="Scan Mønt"
        onPress={() => navigation.navigate("Scanner")}
        style={styles.btn}
      />

      <GoldButton
        title="Min Samling"
        onPress={() => navigation.navigate("Collection")}
        style={styles.btn}
      />

      <GoldButton
        title="Eksporter"
        onPress={() => navigation.navigate("ExportMenu")}
        style={styles.btn}
      />

      <GoldButton
        title="Indstillinger"
        onPress={() => navigation.navigate("Settings")}
        style={styles.btn}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Theme.colors.gold,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
  btn: {
    width: 260,
    marginBottom: 16,
  },
});
