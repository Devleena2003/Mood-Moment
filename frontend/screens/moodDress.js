import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios"; // Import Axios
const url = "http://192.168.29.3:8000";
const moodDress = ({ route }) => {
  const { selectedMood } = route.params; // Extracting selected mood from route params
  const [dresses, setDresses] = useState([]);
  console.log(selectedMood);
  useEffect(() => {
    // Function to fetch dresses based on selected mood
    const fetchDresses = async () => {
      try {
        const response = await axios.get(
          `${url}/dresses/?mood=${selectedMood}`
        );
        console.log(response);
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
                uri: `${url}/show_dress/?filename=${selectedMood}/${dress.replace(
                  `dataset\\${selectedMood}/`,
                  ""
                )}`,
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
  },
  dressItem: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  dressImage: {
    width: 130,
    height: 150,
    resizeMode: "cover",
  },
});

export default moodDress;
