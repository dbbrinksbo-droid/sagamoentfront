// navigation/HomeStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CollectionScreen from "../screens/CollectionScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import EditCoinScreen from "../screens/EditCoinScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
      <Stack.Screen name="EditCoin" component={EditCoinScreen} />
    </Stack.Navigator>
  );
}
