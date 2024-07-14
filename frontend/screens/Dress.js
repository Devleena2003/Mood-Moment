import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const DressesScreen = ({ route }) => {
  const { dresses } = route.params;

  const renderDressItem = ({ item }) => (
    <View style={styles.dressItem}>
      <Image source={{ uri: item.Dress_Path }} style={styles.dressImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dresses}
        keyExtractor={(item) => item.Dress_Path}
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
