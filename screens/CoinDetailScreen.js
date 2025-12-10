import React from "react";
import { View, Image, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalHeader from "../components/RoyalHeader";

export default function CoinDetailScreen({ route, navigation }) {
  const { coin } = route.params;

  return (
    <View style={styles.container}>
      <RoyalHeader title={coin.label_name} />

      <Image source={{ uri: coin.frontImage }} style={styles.img} />
      {coin.backImage && <Image source={{ uri: coin.backImage }} style={styles.img} />}

      <SagaText>Sikkerhed: {(coin.confidence * 100).toFixed(1)}%</SagaText>

      <GoldButton
        title="Rediger"
        onPress={() => navigation.navigate("EditCoinScreen", { coin })}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  img: {
    width: "100%",
    height: 230,
    borderRadius: 10,
    marginBottom: 16,
  },
});
