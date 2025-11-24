import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "../screens/CharactersListScreen";
import CharactersDetailScreen from "../screens/CharactersDetailScreen";






const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer
      style={{ flex: 1, width: "100%", height: "100%", display: "flex" }}
    >

      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#00baff" },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          headerTintColor: "white",
        }}
      >

        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{ title: "Rick and Morty" }}
        />

        <Stack.Screen
          name="CharacterDetail"
          component={CharactersDetailScreen}
          options={{ title: "Back" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
