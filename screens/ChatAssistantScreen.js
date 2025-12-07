// screens/ChatAssistantScreen.js — V12 Legendary AI Edition

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import SagaText from "../components/SagaText";
import GoldButton from "../components/GoldButton";
import Theme from "../theme";
import { askCoinExpert } from "../services/GPTExpert";

export default function ChatAssistantScreen({ route, navigation }) {
  const { ai_metadata, image_uri } = route.params || {};

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sikrer at vi ALDRIG starter uden metadata
  useEffect(() => {
    if (!ai_metadata) {
      setMessages([
        { from: "assistant", text: "Der opstod en fejl — ingen møntdata modtaget." },
      ]);
    } else {
      setMessages([
        {
          from: "assistant",
          text: `Hej! Jeg er din møntekspert.  
Jeg har analyseret mønten, og du kan spørge om alt du ønsker – værdi, stand, sjældenhed eller historie.`,
        },
      ]);
    }
  }, []);

  async function onAsk() {
    setLoading(true);

    const reply = await askCoinExpert(ai_metadata);
    setLoading(false);

    setMessages((prev) => [...prev, { from: "assistant", text: reply }]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      {image_uri && <Image source={{ uri: image_uri }} style={styles.img} />}

      {messages.map((m, i) => (
        <View key={i} style={styles.msgBox}>
          <SagaText>{m.text}</SagaText>
        </View>
      ))}

      <GoldButton
        title={loading ? "Vent et øjeblik…" : "Stil et spørgsmål"}
        onPress={onAsk}
        disabled={loading}
      />

      <GoldButton
        title="Tilbage"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 12 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 20,
  },
  msgBox: {
    backgroundColor: "#141414",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Theme.colors.gold,
  },
});

