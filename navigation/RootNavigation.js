// navigation/RootNavigation.js — V13 Legendary Edition  
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// *** MAIN SCREENS ***
import HomeScreen from "../screens/HomeScreen";
import ScannerScreen from "../screens/ScannerScreen";
import ResultScreen from "../screens/ResultScreen";
import ChatAssistantScreen from "../screens/ChatAssistantScreen";

// *** COLLECTION / DATA ***
import CollectionScreen from "../screens/CollectionScreen";
import CorrectScreen from "../screens/CorrectScreen";
import CorrectLabelScreen from "../screens/CorrectLabelScreen";
import ManualInfoScreen from "../screens/ManualInfoScreen";

// *** AI TRAINER + DATASET ***
import AiTrainerScreen from "../screens/AiTrainerScreen";
import DatasetScreen from "../screens/DatasetScreen";
import DatasetExportScreen from "../screens/DatasetExportScreen";

// *** EXPORT / PDF / ZIP ***
import ExportMenu from "../screens/ExportMenu";
import PdfExportScreen from "../screens/PdfExportScreen";
import ZipExportScreen from "../screens/ZipExportScreen";
import SingleExportChooseScreen from "../screens/SingleExportChooseScreen";
import ShareExportScreen from "../screens/ShareExportScreen";

// *** SETTINGS ***
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >

        {/* Main Flow */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="ChatAssistant" component={ChatAssistantScreen} />

        {/* Collection */}
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="Correct" component={CorrectScreen} />
        <Stack.Screen name="CorrectLabel" component={CorrectLabelScreen} />
        <Stack.Screen name="ManualInfo" component={ManualInfoScreen} />

        {/* AI Trainer */}
        <Stack.Screen name="AiTrainer" component={AiTrainerScreen} />

        {/* Dataset */}
        <Stack.Screen name="Dataset" component={DatasetScreen} />
        <Stack.Screen name="DatasetExport" component={DatasetExportScreen} />

        {/* Export / PDF */}
        <Stack.Screen name="ExportMenu" component={ExportMenu} />
        <Stack.Screen name="PdfExport" component={PdfExportScreen} />
        <Stack.Screen name="ZipExport" component={ZipExportScreen} />
        <Stack.Screen name="SingleExportChoose" component={SingleExportChooseScreen} />
        <Stack.Screen name="ShareExport" component={ShareExportScreen} />

        {/* Settings */}
        <Stack.Screen name="Settings" component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

