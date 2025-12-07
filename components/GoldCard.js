import React, { useRef } from "react";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import Theme from "../theme";

export default function GoldCard({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const pressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const dynamicGlow = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 16],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        shadowColor: Theme.colors.gold,
        shadowOpacity: 0.35,
        shadowRadius: dynamicGlow,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={0.9}
        style={[styles.card, style]}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Theme.sizes.paddingLarge,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.sizes.radiusLarge,
    borderWidth: 2,
    borderColor: Theme.colors.gold,
    alignItems: "center",
  },
});

