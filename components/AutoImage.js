
import React, { useState } from "react";
import { Image, ActivityIndicator, View, StyleSheet, Text } from "react-native";
import Theme from "../theme";

export default function AutoImage({ source, style }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hvis source mangler → ingen freeze
  if (!source || source === "" || typeof source !== "string") {
    return (
      <View style={[styles.wrapper, style]}>
        <Text style={{ color: Theme.colors.textSecondary, fontSize: 12 }}>
          (Intet billede)
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, style]}>
      {loading && !error && (
        <ActivityIndicator size="small" color={Theme.colors.gold} />
      )}

      {!error && (
        <Image
          source={{ uri: source }}
          style={[styles.image, style]}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}

      {error && (
        <Text style={{ color: Theme.colors.textSecondary, fontSize: 12 }}>
          (Billede kunne ikke indlæses)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
  },
});

