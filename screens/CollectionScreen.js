// screens/CollectionScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";

import { getAllCoins } from "../services/db/coinStorage";

export default function CollectionScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------
  // Load collection from SQLite
  // ------------------------------------------------------
  async function loadCoins() {
    setLoading(true);
    const data = await getAllCoins();
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadCoins);
    return unsub;
  }, [navigation]);

  // ------------------------------------------------------
  // UI LIST ITEM
  // ------------------------------------------------------
  const renderCoin = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CoinDetail", { coin: item })}
    >
      <Image
        source={{ uri: item.frontImage }}
        style={styles.thumbnail}
      />

      <View style={{ flex: 1 }}>
        <SagaText style={styles.label}>{item.type || "Ukendt type"}</SagaText>
        <SagaText style={styles.sub}>{item.year || "Ukendt år"}</SagaText>
        <SagaText style={styles.sub2}>
          {item.material || "?"} — {item.condition || "?"}
        </SagaText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SagaText style={styles.title}>Min Samling</SagaText>

      <RoyalDivider />

      {loading ? (
        <SagaText>Indlæser...</SagaText>
      ) : coins.length === 0 ? (
        <SagaText>Ingen mønter gemt endnu.</SagaText>
      ) : (
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderCoin}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      {/* PDF / ZIP */}
      <GoldButton
        title="Eksporter (PDF / ZIP)"
        onPress={() => navigation.navigate("ExportMenu")}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

// ------------------------------------------------------
// STYLE
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  thumbnail: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  sub: {
    opacity: 0.7,
    marginTop: 2,
  },
  sub2: {
    opacity: 0.5,
    marginTop: 2,
  },
});
