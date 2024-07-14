import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import axios from "axios";
import { CheckBox } from "react-native-elements";

const userInput2 = ({ navigation }) => {
  const [isCheckedRed, setIsCheckedRed] = useState(false);
  const [isCheckedBlue, setIsCheckedBlue] = useState(false);
  const [isCheckedGreen, setIsCheckedGreen] = useState(false);
  const [isCheckedYellow, setIsCheckedYellow] = useState(false);
  const [isCheckedPurple, setIsCheckedPurple] = useState(false);
  const [isCheckedOrange, setIsCheckedOrange] = useState(false);

  const updatePreferences = async () => {
    try {
      const preferences = {
        preferredColors: [],
      };

      if (isCheckedRed) preferences.preferredColors.push("Red");
      if (isCheckedBlue) preferences.preferredColors.push("Blue");
      if (isCheckedGreen) preferences.preferredColors.push("Green");
      if (isCheckedYellow) preferences.preferredColors.push("Yellow");
      if (isCheckedPurple) preferences.preferredColors.push("Purple");
      if (isCheckedOrange) preferences.preferredColors.push("Orange");

      const response = await axios.put(
        "http://192.168.29.3:5000/api/v1/auth/color/preferences",
        preferences
      );

      console.log("Preferences updated successfully:", response.data.message);
      navigation.navigate("settings");
    } catch (error) {
      console.error("Error updating preferences:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Color Preferences</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Red"
          checked={isCheckedRed}
          onPress={() => setIsCheckedRed(!isCheckedRed)}
        />
        <CheckBox
          title="Blue"
          checked={isCheckedBlue}
          onPress={() => setIsCheckedBlue(!isCheckedBlue)}
        />
        <CheckBox
          title="Green"
          checked={isCheckedGreen}
          onPress={() => setIsCheckedGreen(!isCheckedGreen)}
        />
        <CheckBox
          title="Yellow"
          checked={isCheckedYellow}
          onPress={() => setIsCheckedYellow(!isCheckedYellow)}
        />
        <CheckBox
          title="Purple"
          checked={isCheckedPurple}
          onPress={() => setIsCheckedPurple(!isCheckedPurple)}
        />
        <CheckBox
          title="Orange"
          checked={isCheckedOrange}
          onPress={() => setIsCheckedOrange(!isCheckedOrange)}
        />
      </View>
      <Button title="Save Preferences & Start" onPress={updatePreferences} />
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
  checkboxContainer: {
    marginTop: 20,
  },
});

export default userInput2;
