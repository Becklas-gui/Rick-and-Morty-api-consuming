import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";




export default function SearchBar({ value, onChange }) {
  return (

    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#333" style={{ marginRight: 8 }} />

      <TextInput
        style={styles.input}
        placeholder="Buscar personagem..."
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChange}
      />
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
});

