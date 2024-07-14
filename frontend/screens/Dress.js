import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const DressesScreen = ({ route }) => {
  const { dresses } = route.params;

  const renderDressItem = ({ item, index }) => (
    <View
      style={styles.dressItem}
      key={`${item.Dress_Path}-${item.title}-${index}`}
    >
      <Image source={{ uri: item.Dress_Path }} style={styles.dressImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dresses}
        keyExtractor={(item, index) =>
          `${item.Dress_Path}-${item.title}-${index}`
        } // Use a combination of Dress_Path, title, and index as key
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
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default DressesScreen;
