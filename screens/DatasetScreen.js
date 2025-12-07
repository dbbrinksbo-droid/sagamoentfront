import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";

import Theme from "../theme";
import SagaText from "../components/SagaText";
import GoldCard from "../components/GoldCard";
import GoldButton from "../components/GoldButton";
import FadeInView from "../components/FadeInView";
import SagaSection from "../components/SagaSection";
import Icons from "../theme/Icons";

export default function DatasetScreen({ navigation }) {
  const [files, setFiles] = useState([]);

  // (Her bevarer vi din backend/AI-data–udvid til dit behov)
  useEffect(() => {
    setFiles([]);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SagaSection title="Datasæt" />

      <FadeInView duration={400}>
        <GoldCard style={{ paddingVertical: 20 }}>
          <SagaText center variant="body" style={{ marginBottom: 10 }}>
            Importer ZIP-filer med træningsdata til AI'en
          </SagaText>
          <Image source={Icons.zip} style={styles.iconLarge} />
        </GoldCard>
      </FadeInView>

      <FadeInView duration={500}>
        <GoldButton
          title="Importer ZIP"
          icon={Icons.import}
          onPress={() => navigation.navigate("ImportScreen")}
          style={styles.btn}
        />
      </FadeInView>

      <FadeInView duration={600}>
        <GoldButton
          title="Eksporter ZIP"
          icon={Icons.export}
          onPress={() => navigation.navigate("ExportScreen")}
          style={styles.btn}
        />
      </FadeInView>

      <SagaSection title="Filer i datasættet" />

      <FadeInView duration={700}>
        {files.length === 0 ? (
          <SagaText center variant="small" style={{ opacity: 0.7 }}>
            Ingen filer fundet…
          </SagaText>
        ) : (
          files.map((file, i) => (
            <GoldCard key={i} style={styles.fileCard}>
              <Image source={Icons.catalog} style={styles.fileIcon} />
              <SagaText variant="body">{file}</SagaText>
            </GoldCard>
          ))
        )}
      </FadeInView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.sizes.paddingLarge,
    backgroundColor: Theme.colors.background,
  },
  iconLarge: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 10,
  },
  btn: {
    marginTop: 18,
  },
  fileCard: {
    marginBottom: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  fileIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

