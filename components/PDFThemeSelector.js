import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";

import Colors from "../theme/colors";
import GoldButton from "./GoldButton";
import SagaText from "./SagaText";

export default function PDFThemeSelector({ visible, onClose, onSelect }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <SagaText variant="title" style={styles.title}>
            Vælg PDF Tema
          </SagaText>

          <GoldButton
            title="Royal Gold"
            onPress={() => onSelect("royal")}
            style={styles.btn}
          />

          <GoldButton
            title="Antique Manuscript"
            onPress={() => onSelect("antique")}
            style={styles.btn}
          />

          <GoldButton
            title="Black Chrome Royal"
            onPress={() => onSelect("chrome")}
            style={styles.btn}
          />

          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <SagaText variant="subtitle" style={styles.cancel}>
              Annuller
            </SagaText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 10,
    borderColor: Colors.gold,
    borderWidth: 2,
  },
  title: {
    textAlign: "center",
    marginBottom: 14,
  },
  btn: {
    marginBottom: 12,
  },
  cancel: {
    textAlign: "center",
  },
});
