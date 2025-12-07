// CollectionScreen.js – SagaMoent Royal Gold Catalog
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import Theme from "../theme";
import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaSection from "../components/SagaSection";
import Icons from "../theme/Icons";

import {
  getCollection,
  deleteCoin,
  getTotalValue,
} from "../services/CoinsService";

export default function CollectionScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [totals, setTotals] = useState({
    count: 0,
    totalMin: 0,
    totalMax: 0,
    totalAvg: 0,
  });

  // -------------------------------------------------------
  // LOAD COLLECTION
  // -------------------------------------------------------
  async function loadData() {
    const data = await getCollection();
    const total = await getTotalValue();

    setCoins(data);
    setTotals(total);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadData);
    loadData();
    return unsubscribe;
  }, []);

  // -------------------------------------------------------
  // DELETE COIN
  // -------------------------------------------------------
  async function handleDelete(id) {
    await deleteCoin(id);
    loadData();
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <ScrollView style={styles.container}>
      <SagaSection title="Min Samling" />

      {/* TOTAL SUM */}
      <GoldCard style={styles.totalCard}>
        <SagaText variant="h2" center>
          Samlet værdi
        </SagaText>

        <SagaText center variant="gold" style={{ fontSize: 22, marginTop: 10 }}>
          {totals.totalAvg} DKK
        </SagaText>

        <SagaText center variant="small" style={{ opacity: 0.7 }}>
          ({totals.totalMin} – {totals.totalMax} DKK)
        </SagaText>

        <SagaText center variant="small" style={{ marginTop: 10 }}>
          Antal mønter: {totals.count}
        </SagaText>

        <GoldButton
          title="Eksporter samling"
          icon={Icons.export}
          onPress={() => navigation.navigate("ExportMenu")}
          style={{ marginTop: 15 }}
        />
      </GoldCard>

      {/* LISTE AF MØNTER */}
      {coins.map((coin) => (
        <GoldCard key={coin.id} style={styles.coinCard}>
          <View style={styles.row}>
            {/* Billede */}
            {coin.frontImageBase64 ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${coin.frontImageBase64}`,
                }}
                style={styles.image}
              />
            ) : null}

            {/* INFO */}
            <View style={{ flex: 1 }}>
              <SagaText variant="subtitle" style={{ marginBottom: 4 }}>
                {coin.aiLabel || "Ukendt mønt"}
              </SagaText>

              {coin.ocr ? (
                <SagaText variant="small">År: {coin.ocr}</SagaText>
              ) : null}

              {/* Vision Notes - kort */}
              {coin.visionAnalysis ? (
                <SagaText variant="tiny" style={styles.visionText}>
                  {coin.visionAnalysis.slice(0, 80)}...
                </SagaText>
              ) : null}

              {/* Dato */}
              <SagaText variant="tiny" style={{ opacity: 0.6, marginTop: 6 }}>
                Gemt: {new Date(coin.savedAt).toLocaleDateString("da-DK")}
              </SagaText>
            </View>

            {/* DELETE KNAP */}
            <TouchableOpacity onPress={() => handleDelete(coin.id)}>
              <SagaText variant="gold" style={{ fontSize: 22 }}>
                ✖
              </SagaText>
            </TouchableOpacity>
          </View>
        </GoldCard>
      ))}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

// -------------------------------------------------------
// STYLES
// -------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.sizes.paddingLarge,
  },

  totalCard: {
    marginBottom: 25,
    paddingVertical: 25,
  },

  coinCard: {
    marginBottom: 16,
    paddingVertical: 16,
  },

  row: {
    flexDirection: "row",
    gap: 14,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: Theme.colors.goldFaded,
    borderWidth: 1,
  },

  visionText: {
    marginTop: 5,
    opacity: 0.7,
  },
});

