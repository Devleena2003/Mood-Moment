import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import axios from "axios";

const UserInput1 = ({ navigation }) => {
  const [isCheckedStreetwear, setIsCheckedStreetwear] = useState(false);
  const [isCheckedVintage, setIsCheckedVintage] = useState(false);
  const [isCheckedBold, setIsCheckedBold] = useState(false);
  const [isCheckedRetro, setIsCheckedRetro] = useState(false);
  const [isCheckedCasual, setIsCheckedCasual] = useState(false);
  const [isCheckedEco, setIsCheckedEco] = useState(false);
  const [isCheckedMinimalist, setIsCheckedMinimalist] = useState(false);

  const updatePreferences = async () => {
    try {
      const preferences = {
        preferredStyles: [],
      };

      if (isCheckedStreetwear) preferences.preferredStyles.push("Streetwear");
      if (isCheckedVintage) preferences.preferredStyles.push("Vintage Vibes");
      if (isCheckedBold) preferences.preferredStyles.push("Bold and Bright");
      if (isCheckedRetro) preferences.preferredStyles.push("Retro Futurism");
      if (isCheckedCasual) preferences.preferredStyles.push("Casual Comfort");
      if (isCheckedEco)
        preferences.preferredStyles.push("Eco-friendly Fashion");
      if (isCheckedMinimalist)
        preferences.preferredStyles.push("Minimalist Maven");

      // Replace 'http://localhost:3000' with your actual backend server URL
      const response = await axios.put(
        "http://192.168.29.3:5000/api/v1/auth/user/style/preferences",
        preferences
      );

      console.log("Preferences updated successfully:", response.data.message);
      navigation.navigate("userInput2");
      // You can add further UI updates or navigation logic here upon successful update
    } catch (error) {
      console.error("Error updating preferences:", error.message);
      // Handle error responses from the server or network issues
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Style Preference</Text>
      <Text style={styles.des}>Select all that match your fashion</Text>
      <CheckBox
        title="Streetwear"
        checked={isCheckedStreetwear}
        onPress={() => setIsCheckedStreetwear(!isCheckedStreetwear)}
      />
      <CheckBox
        title="Vintage Vibes"
        checked={isCheckedVintage}
        onPress={() => setIsCheckedVintage(!isCheckedVintage)}
      />
      <CheckBox
        title="Bold and Bright"
        checked={isCheckedBold}
        onPress={() => setIsCheckedBold(!isCheckedBold)}
      />
      <CheckBox
        title="Retro Futurism"
        checked={isCheckedRetro}
        onPress={() => setIsCheckedRetro(!isCheckedRetro)}
      />
      <CheckBox
        title="Casual Comfort"
        checked={isCheckedCasual}
        onPress={() => setIsCheckedCasual(!isCheckedCasual)}
      />
      <CheckBox
        title="Eco-friendly Fashion"
        checked={isCheckedEco}
        onPress={() => setIsCheckedEco(!isCheckedEco)}
      />
      <CheckBox
        title="Minimalist Maven"
        checked={isCheckedMinimalist}
        onPress={() => setIsCheckedMinimalist(!isCheckedMinimalist)}
      />

      <Button title="Save Preferences & Next" onPress={updatePreferences} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7336E",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  des: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 20,
  },
});

export default UserInput1;
