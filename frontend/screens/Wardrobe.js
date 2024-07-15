import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useVoiceNavigation } from "../context/VoiceNavigationContext";

const WardrobeScreen = ({ route, navigation }) => {
  const { speakText } = useVoiceNavigation();
  const { dress, accessories } = route.params;
  console.log("Dress URI:", dress);
  console.log("Accessories:", accessories);

  const handleGoToWardrobe = () => {
    navigation.navigate("Home");
    speakText("Navigating to the home screen");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.dressContainer}>
          <Text style={styles.title}>Selected Dress</Text>
          <Image
            source={{
              uri: `http://192.168.29.3:8001/assets/images/${encodeURIComponent(
                dress.Dress_Path
              )}`,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.accessoriesContainer}>
          <Text style={styles.title}>Accessories</Text>
          <FlatList
            data={accessories}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.accessoryItem}>
                <Image
                  source={{
                    uri: `http://192.168.29.3:8001/assets/images/${encodeURIComponent(
                      item
                    )}`,
                  }}
                  style={styles.accessoryImage}
                />
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No accessories found</Text>
              </View>
            )}
          />
        </View>
        <TouchableOpacity onPress={handleGoToWardrobe} style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dressContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  accessoriesContainer: {
    marginBottom: 20,
  },
  accessoryItem: {
    marginBottom: 10,
  },
  accessoryImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 16,
    color: "#999",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default WardrobeScreen;
