import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios"; // Import Axios

const moodDress = ({ route }) => {
  const { selectedMood } = route.params; // Extracting selected mood from route params
  const [dresses, setDresses] = useState([]);
  console.log(selectedMood);
  useEffect(() => {
    // Function to fetch dresses based on selected mood
    const fetchDresses = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/dresses/?mood=${selectedMood}`
        );

        if (!response.data) {
          throw new Error("Dresses not found");
        }
        setDresses(response.data);
      } catch (error) {
        console.error("Error fetching dresses:", error);
        setDresses([]); // Clear dresses state on error
      }
    };

    fetchDresses(); // Fetch dresses when component mounts
  }, [selectedMood]); // Dependency on selectedMood to refetch dresses when mood changes

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Here are your {selectedMood} dresses:
      </Text>

      <View style={styles.dressesContainer}>
        {dresses.map((dress, index) => (
          <TouchableOpacity key={index} style={styles.dressItem}>
            <Image
              style={styles.dressImage}
              source={{
                uri: `http://10.0.2.2:8000/show_dress/?filename=${selectedMood}/${dress}`,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dressesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dressItem: {
    margin: 10,
    borderRadius: 10,
  },
  dressImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
});

export default moodDress;
