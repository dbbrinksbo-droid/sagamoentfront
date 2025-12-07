import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Theme from "../theme";

export default function GoldDropdown({ label, value, onValueChange, items }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          dropdownIconColor={Theme.colors.gold}
          style={styles.picker}
        >
          {items.map((i) => (
            <Picker.Item label={i} value={i} key={i} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 18,
  },
  label: {
    color: Theme.colors.textGold,
    marginBottom: 6,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: Theme.colors.gold,
    borderRadius: 10,
    backgroundColor: Theme.colors.surface,
  },
  picker: {
    color: Theme.colors.textPrimary,
  },
});
