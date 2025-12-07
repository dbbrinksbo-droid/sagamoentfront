import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ScannerScreen from "../screens/ScannerScreen";
import ResultScreen from "../screens/ResultScreen";
import ChatAssistantScreen from "../screens/ChatAssistantScreen";

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="ChatAssistant" component={ChatAssistantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

