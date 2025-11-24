import React, { useEffect, useState } from "react";
import {View, Text,Image,  TouchableOpacity,ActivityIndicator, StyleSheet,} from "react-native";
import axios from "axios";
import SearchBar from "../components/SearchBar";







export default function CharactersListScreen({ navigation }) {

  const [allCharacters, setAllCharacters] = useState([]);     
  const [filtered, setFiltered] = useState([]);              
  const [characters, setCharacters] = useState([]);          
  const [page, setPage] = useState(1);                        
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const ITEMS_PER_PAGE = 16;


  // ------------------------------------------------------------
  


  async function loadAll() {

    try {
      setLoading(true);

      let url = "https://rickandmortyapi.com/api/character";
      let results = [];

      while (url) {
        const response = await axios.get(url);
        results = [...results, ...response.data.results];
        url = response.data.info.next;
      }

      setAllCharacters(results);
    } catch (err) {
      console.log("Error loading characters:", err);
    } finally {
      setLoading(false);
    }
  }

  // barra de pesquisa bruh

  function searchCharacters(text) {
    if (text.trim() === "") {
      setIsSearching(false);
      setFiltered([]);
      setPage(1); //volta sempre pra primeira pg depois da pesquisa
      return;
    }

    setIsSearching(true);

    const lower = text.toLowerCase();

    const results = allCharacters.filter((c) =>
      c.name.toLowerCase().includes(lower)
    );

    setFiltered(results);
    setPage(1);
  }


  // update da pagina, podem ter mais personagens depois eu acho


  function updatePage() {
    const source = isSearching ? filtered : allCharacters;
    const totalPages = Math.ceil(source.length / ITEMS_PER_PAGE);

    if (totalPages === 0) {
      setCharacters([]);
      return;
    }

    // circular infinito das paginas la, pra voltar pra primeira depois da ultima


    let newPage = page;
    if (newPage > totalPages) newPage = 1;
    if (newPage < 1) newPage = totalPages;

    const start = (newPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setCharacters(source.slice(start, end));
    setPage(newPage);
  }

 
  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (allCharacters.length > 0) updatePage();
  }, [page, allCharacters, filtered]);
 


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading characters...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <SearchBar onChange={searchCharacters} />

      <View style={styles.pageContainer}>
        {characters.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterDetail", { id: item.id })
            }
          >

            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>
              {item.status} • {item.species}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* mais da paginaçao */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setPage(page - 1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>◄</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumber}>Page {page}</Text>

        <TouchableOpacity
          onPress={() => setPage(page + 1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>►</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}




//styles 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9fdd7",
    padding: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  pageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: 150,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    margin: 8,
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },

  controls: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  button: {
    backgroundColor: "#00baff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  pageNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
