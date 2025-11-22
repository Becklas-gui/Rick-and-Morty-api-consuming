import React, { useEffect, useState } from "react";
import {View,Text,Image,ActivityIndicator,FlatList,TouchableOpacity,StyleSheet,} from "react-native";
import axios from "axios";
import SearchBar from "../components/SearchBar";





export default function CharactersListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(
    "https://rickandmortyapi.com/api/character"
  );

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function loadCharacters() {

    if (!nextPage || isSearching) return;

    const response = await axios.get(nextPage);
    setCharacters((prev) => [...prev, ...response.data.results]);
    setNextPage(response.data.info.next);
    setLoading(false);
  }

  async function searchCharacters(text) {
    setSearch(text);

    if (text.length === 0) {
      setCharacters([]);
      setNextPage("https://rickandmortyapi.com/api/character");
      setIsSearching(false);
      loadCharacters();
      return;
    }

    setIsSearching(true);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${text}`
      );
      setCharacters(response.data.results);
    } catch {
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={searchCharacters} />

      {loading && characters.length === 0 ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (

        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadCharacters}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("CharacterDetail", { id: item.id })
              }
            >


              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subtitle}>
                  {item.status} • {item.species}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#c9fdd7",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
