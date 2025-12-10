// screens/ExportMenu.js
import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";
import Theme from "../theme/Theme";

export default function ExportMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>Eksport</SagaText>

      <RoyalDivider />

      <GoldButton
        title="Lav PDF"
        onPress={() => navigation.navigate("PdfExport")}
        style={styles.btn}
      />

      <GoldButton
        title="Lav ZIP"
        onPress={() => navigation.navigate("ZipExport")}
        style={styles.btn}
      />

      <GoldButton
        title="Tilbage"
        onPress={() => navigation.goBack()}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  btn: {
    marginBottom: 20,
  },
});
