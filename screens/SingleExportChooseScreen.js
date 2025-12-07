// SingleExportChooseScreen.js – Vælg én mønt til eksport
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { getCollection } from "../services/CoinsService";
import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import SagaSection from "../components/SagaSection";
import Theme from "../theme";

export default function SingleExportChooseScreen({ navigation }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getCollection();
    setCoins(data);
  }

  return (
    <ScrollView style={styles.container}>
      <SagaSection title="Vælg én mønt" />

      {coins.map((coin) => (
        <TouchableOpacity
          key={coin.id}
          onPress={() => navigation.navigate("SingleExportScreen", { coin })}
        >
          <GoldCard style={styles.card}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {coin.frontImageBase64 ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${coin.frontImageBase64}` }}
                  style={styles.image}
                />
              ) : null}

              <View style={{ flex: 1 }}>
                <SagaText variant="subtitle">{coin.aiLabel}</SagaText>
                <SagaText variant="tiny" style={{ opacity: 0.7 }}>
                  {coin.ocr ? `År: ${coin.ocr}` : "Ukendt år"}
                </SagaText>
              </View>
            </View>
          </GoldCard>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.sizes.paddingLarge,
  },
  card: {
    marginBottom: 14,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.goldFaded,
  },
});

