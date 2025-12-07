
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Theme from "../theme";

export default function ScreenContainer({ children, style }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    padding: Theme.sizes.paddingLarge,
  },
});
