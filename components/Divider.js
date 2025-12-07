import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../theme/colors";

export default function Divider() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.goldSoft,
    marginVertical: 10,
  },
});

