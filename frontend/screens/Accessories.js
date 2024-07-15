import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useVoiceNavigation } from "../context/VoiceNavigationContext";
import { useNavigation } from "@react-navigation/native";

const AccessoriesScreen = ({ route }) => {
  const { speakText } = useVoiceNavigation();
  const { dress } = route.params; // Ensure 'dress' is correctly accessed from route params
  const [accessories, setAccessories] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchAccessories();
    speakText("These are your accessories for your selected dress");
  }, [speakText]);

  const fetchAccessories = async () => {
    try {
      const response = await axios.post(
        "http://192.168.29.3:8001/accessories/",
        {
          selected_dresses: [dress.Dress_Path], // Pass dress path as an array
        }
      );
      console.log("Accessories Response:", response.data); // Debugging: Log response

      if (response.data.accessories && response.data.accessories.length > 0) {
        setAccessories(response.data.accessories);
      } else {
        setAccessories([]); // Reset accessories if no data received
        Alert.alert(
          "No Accessories Found",
          "No accessories found for this dress."
        );
      }
    } catch (error) {
      console.error("Error fetching accessories:", error);
      Alert.alert("Error", "Failed to fetch accessories. Please try again.");
      speakText("Failed to fetch accessories. Please try again.");
    }
  };

  const renderAccessoryItem = ({ item, index }) => {
    if (!item) {
      return null; // Handle case where item is undefined or null
    }

    const imagePath = item.replace(/\\/g, "/");

    return (
      <View style={styles.accessoryItem} key={`${item}-${index}`}>
        <Image
          source={{
            uri: `http://192.168.29.3:8001/assets/images/${encodeURIComponent(
              imagePath
            )}`,
          }}
          style={styles.accessoryImage}
        />
      </View>
    );
  };

  const handleGoToWardrobe = () => {
    navigation.navigate("WardrobeScreen", {
      dress,
      accessories,
    });
    speakText("Here is your personalized wardrobe");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accessories for this dress</Text>
      <FlatList
        data={accessories}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderAccessoryItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No accessories found</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleGoToWardrobe} style={styles.button}>
        <Text style={styles.buttonText}>Go to Wardrobe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accessoryItem: {
    marginBottom: 10,
  },
  accessoryImage: {
    width: 300,
    height: 300,
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

export default AccessoriesScreen;
