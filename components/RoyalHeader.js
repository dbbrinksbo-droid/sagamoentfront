import React from "react";
import { View, StyleSheet, Image } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function RoyalHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/branding/saga.png")}
        style={styles.logo}
      />
      <SagaText variant="title">{title}</SagaText>
      <SagaText variant="subtitle">{subtitle}</SagaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

