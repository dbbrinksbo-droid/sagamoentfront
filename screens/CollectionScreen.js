import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import SagaText from "../components/SagaText";
import RoyalHeader from "../components/RoyalHeader";
import { getCollection } from "../services/CoinsService";

export default function CollectionScreen({ navigation }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCollection();
      setCoins(data.reverse());
    };

    const unsub = navigation.addListener("focus", load);
    load();

    return unsub;
  }, [navigation]);

  function openCoin(c) {
    navigation.navigate("CoinDetailScreen", { coin: c });
  }

  return (
    <View style={styles.container}>
      <RoyalHeader title="Min Samling" />

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openCoin(item)} style={styles.card}>
            <Image source={{ uri: item.frontImage }} style={styles.img} />
            <SagaText>{item.label_name}</SagaText>
            <SagaText>{(item.confidence * 100).toFixed(1)}%</SagaText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    marginBottom: 12,
  },
  img: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
  },
});
