import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import { useVoiceNavigation } from "../context/VoiceNavigationContext";

const DressesScreen = ({ route, navigation }) => {
  const { speakText } = useVoiceNavigation();
  const { dresses } = route.params;
  speakText("select one dress to see the accessory");
  const handleDressPress = (item) => {
    navigation.navigate("eventAccessories", { dress: item });
    speakText("Navigating to the accessories screen");
  };

  const renderDressItem = ({ item, index }) => {
    const imagePath = item.Dress_Path.replace(/\\/g, "/");

    return (
      <TouchableOpacity
        style={styles.dressItem}
        onPress={() => handleDressPress(item)}
        key={`${item.Dress_Path}-${item.title}-${index}`}
      >
        <Image
          source={{
            uri: `http://192.168.29.3:8001/assets/images/${encodeURIComponent(
              imagePath
            )}`,
          }}
          style={styles.dressImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dresses}
        keyExtractor={(item, index) =>
          `${item.Dress_Path}-${item.title}-${index}`
        }
        renderItem={renderDressItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    padding: 10,
  },
  dressItem: {
    marginBottom: 10,
  },
  dressImage: {
    width: 400,
    height: 400,
    resizeMode: "cover",
  },
  invalidPathText: {
    color: "red",
    textAlign: "center",
    padding: 20,
  },
});

export default DressesScreen;
