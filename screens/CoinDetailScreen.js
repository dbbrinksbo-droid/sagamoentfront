// screens/CoinDetailScreen.js

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import RoyalDivider from "../components/RoyalDivider";

import { deleteCoin } from "../services/db/coinStorage";

export default function CoinDetailScreen({ route, navigation }) {
  const { coin } = route.params;
  const [deleting, setDeleting] = useState(false);

  const {
    id,
    frontImage,
    backImage,
    year,
    type,
    material,
    regent,
    condition,
    valueDKK,
    errorType,
    notes,
  } = coin;

  // ------------------------------------------------------
  // SLET MØNT
  // ------------------------------------------------------
  async function handleDelete() {
    Alert.alert(
      "Slet mønt",
      "Er du sikker på at du vil slette denne mønt?",
      [
        { text: "Annuller" },
        {
          text: "Slet",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            await deleteCoin(id);
            setDeleting(false);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <SagaText style={styles.title}>Mønt Detaljer</SagaText>

        {/* BILLEDER */}
        <View style={styles.imageRow}>
          {frontImage && (
            <Image source={{ uri: frontImage }} style={styles.image} />
          )}
          {backImage && (
            <Image source={{ uri: backImage }} style={styles.image} />
          )}
        </View>

        <RoyalDivider />

        {/* INFO FELTER */}
        <View style={styles.box}>
          <Field label="Betegnelse" value={type} />
          <Field label="Årgang" value={year} />
          <Field label="Regent" value={regent} />
          <Field label="Metal" value={material} />
          <Field label="Stand" value={condition} />
        </View>

        <RoyalDivider />

        {/* ERROR / VARIANT INFO */}
        <View style={styles.box}>
          <Field label="Fejltype" value={errorType} />
        </View>

        <RoyalDivider />

        {/* VÆRDI */}
        <View style={styles.box}>
          <Field label="Værdi (DKK)" value={valueDKK} />
        </View>

        <RoyalDivider />

        {/* NOTES */}
        <View style={styles.box}>
          <Field label="Noter" value={notes || "—"} />
        </View>

        <RoyalDivider />

        {/* BUTTONS */}
        <GoldButton
          title="Rediger Mønt"
          onPress={() =>
            navigation.navigate("EditCoin", {
              coin,
            })
          }
          style={{ marginTop: 20 }}
        />

        <GoldButton
          title={deleting ? "Sletter..." : "Slet Mønt"}
          onPress={handleDelete}
          style={{ marginTop: 10 }}
        />

        <GoldButton
          title="Eksporter PDF (kommer)"
          onPress={() => Alert.alert("Under udvikling", "PDF kommer i V13+")}
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
}

// ------------------------------------------------------
// Reusable field component
// ------------------------------------------------------
function Field({ label, value }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <SagaText style={styles.fieldLabel}>{label}</SagaText>
      <SagaText style={styles.fieldValue}>{value || "—"}</SagaText>
    </View>
  );
}

// ------------------------------------------------------
// STYLES
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
  imageRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
  },
  box: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  fieldValue: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
});
