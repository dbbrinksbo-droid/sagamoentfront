import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";

import Theme from "../theme";
import RoyalHeader from "../components/RoyalHeader";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import SagaText from "../components/SagaText";

import GoldInput from "../components/GoldInput"; // text input felt
import GoldDropdown from "../components/GoldDropdown"; // dropdown felt

export default function ManualInfoScreen({ navigation, route }) {
  const { imageFront, imageBack } = route.params;

  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [rarity, setRarity] = useState("50");
  const [notes, setNotes] = useState("");

  const onContinue = () => {
    navigation.navigate("ResultScreen", {
      imageFront,
      imageBack,
      userInput: {
        year,
        country,
        metal,
        type,
        description,
        condition,
        rarity,
        notes,
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      
      <RoyalHeader 
        title="Manuel registrering"
        subtitle="Tilføj data for at hjælpe AI'en"
      />

      {/* Billeder */}
      <GoldCard style={{ alignItems: "center", marginBottom: 20 }}>
        <SagaText variant="subtitle" style={{ marginBottom: 10 }}>Forside</SagaText>
        <Image source={{ uri: imageFront }} style={styles.img} />

        <SagaText variant="subtitle" style={{ marginTop: 20, marginBottom: 10 }}>Bagside</SagaText>
        <Image source={{ uri: imageBack }} style={styles.img} />
      </GoldCard>

      {/* INPUTS */}
      <GoldInput label="Årstal" value={year} onChangeText={setYear} />
      <GoldInput label="Land" value={country} onChangeText={setCountry} />

      <GoldDropdown 
        label="Metal"
        value={metal}
        onValueChange={setMetal}
        items={["Guld", "Sølv", "Kobber", "Bronze", "Nikkel", "Andet"]}
      />

      <GoldInput label="Mønttype (fx 1 krone)" value={type} onChangeText={setType} />

      <GoldInput 
        label="Beskrivelse"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <GoldDropdown 
        label="Stand"
        value={condition}
        onValueChange={setCondition}
        items={["Poor", "Fair", "Good", "Fine", "Very Fine", "Extra Fine", "Mint"]}
      />

      <GoldDropdown 
        label="Sjældenhed (1-100)"
        value={rarity}
        onValueChange={setRarity}
        items={["10","20","30","40","50","60","70","80","90","100"]}
      />

      <GoldInput 
        label="Noter"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <GoldButton 
        title="Fortsæt til AI analyse"
        style={{ marginTop: 25 }}
        onPress={onContinue}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.sizes.paddingLarge,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
