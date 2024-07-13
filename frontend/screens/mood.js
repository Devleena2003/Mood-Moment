import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const mood = ({ navigation }) => {
  const handleMoodSelection = (mood) => {
    navigation.navigate("dress", { selectedMood: mood });
  };

  return (
    <View>
      <View>
        <Text>How's Your Mood Today?</Text>
        <Text>Let us find some clothes for you</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleMoodSelection("happy")}>
          <Image style={styles.img} source={require("../assets/happy.jpg")} />
          <Text style={{ alignSelf: "center", padding: 10, fontSize: 20 }}>
            Happy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMoodSelection("sad")}>
          <Image style={styles.img} source={require("../assets/sad.jpg")} />
          <Text style={{ alignSelf: "center", padding: 10, fontSize: 20 }}>
            Sad
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleMoodSelection("frustated")}>
          <Image style={styles.img} source={require("../assets/angry.jpg")} />
          <Text style={{ alignSelf: "center", padding: 10, fontSize: 20 }}>
            Frustrated
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMoodSelection("festive")}>
          <Image style={styles.img} source={require("../assets/festive.jpg")} />
          <Text style={{ alignSelf: "center", padding: 10, fontSize: 20 }}>
            Festive
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ alignSelf: "center", padding: 10, fontSize: 20 }}>or</Text>
      <View style={styles.btnCon}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff" }}>Connect with your music app</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff" }}>Connect with social media</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    padding: 20,
  },
  img: {
    borderRadius: 80,
    width: 120,
    height: 120,
  },
  button: {
    padding: 20,
    backgroundColor: "#F7336E",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
  },
  btnCon: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default mood;
