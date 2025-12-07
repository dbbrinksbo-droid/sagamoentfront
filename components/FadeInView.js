import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function FadeInView({ duration = 300, style, children }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();
  }, []);

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}

