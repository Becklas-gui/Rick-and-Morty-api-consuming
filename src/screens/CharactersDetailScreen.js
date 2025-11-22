import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";






export default function CharactersDetailScreen({ route }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);

  async function loadDetails() {

    const response = await axios.get(
       `https://rickandmortyapi.com/api/character/${id}`
    );
    setCharacter(response.data);
  }

  useEffect(() => {
    loadDetails();
  }, []);

  if (!character) {
    return (
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={{ marginTop: 100 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name}>{character.name}</Text>

      <Text style={styles.field}>Status: {character.status}</Text>
      <Text style={styles.field}>Specie: {character.species}</Text>
      <Text style={styles.field}>Gender: {character.gender}</Text>

      <Text style={styles.title}>Origin</Text>
      <Text style={styles.field}>{character.origin.name}</Text>

      <Text style={styles.title}>Current Location</Text>
      <Text style={styles.field}>{character.location.name}</Text>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#c9fdd7",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 120,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  field: {
    fontSize: 18,
    marginVertical: 4,
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
