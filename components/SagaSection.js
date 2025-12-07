import React from "react";
import { View, StyleSheet } from "react-native";
import SagaText from "./SagaText";
import Theme from "../theme";

export default function SagaSection({ title, style }) {
  return (
    <View style={[styles.container, style]}>
      <SagaText variant="subtitle" center style={styles.title}>
        {title}
      </SagaText>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 6,
  },
  line: {
    width: "30%",
    height: 2,
    backgroundColor: Theme.colors.gold,
    borderRadius: 2,
  },
});

