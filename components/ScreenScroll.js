
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Theme from "../theme";

export default function ScreenScroll({ children, style }) {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={styles.inner}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  inner: {
    padding: Theme.sizes.paddingLarge,
    paddingBottom: 100,
  },
});

