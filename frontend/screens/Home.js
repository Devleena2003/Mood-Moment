import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card1}>
        <View style={styles.image}>
          <Image style={styles.img} source={require("../assets/closet.jpg")} />
        </View>
        <View>
          <Text style={styles.header}>Future Closet</Text>
          <Text style={styles.des}>Your Outfit Calender</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("userInput1")}
          >
            <Text style={{ color: "#fff" }}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card2}>
        <View style={styles.image}>
          <Image style={styles.img} source={require("../assets/mood.jpg")} />
        </View>
        <View>
          <Text style={styles.header}>Mood Threads</Text>
          <Text style={styles.des}>Wear Your Feelings</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("mood")}
          >
            <Text style={{ color: "#fff" }}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7336E",
    alignItems: "center",
    justifyContent: "center",
  },
  card1: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    cursor: "pointer",
  },
  card2: {
    marginTop: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    cursor: "pointer",
  },
  image: {
    borderRadius: 8,
  },
  img: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  des: {
    fontSize: 15,
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F7336E",
    color: "#fff",
    fontWeight: 300,
    marginTop: 15,
  },
});

export default Home;
