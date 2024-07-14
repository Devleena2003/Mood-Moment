import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { useZoomContext } from '../context/ZoomContext';
import { GestureHandlerRootView, ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useColorContext } from "../context/ColorContext";
import * as Location from 'expo-location';
import { useVoiceNavigation } from '../context/VoiceNavigationContext';


const Settings = ({ navigation }) => {
  const [isCheckedLocation, setIsCheckedLocation] = useState(false);
  const [isCheckedVintage, setIsCheckedVintage] = useState(false);
  const [isCheckedEco, setIsCheckedEco] = useState(false);
  const [isCheckedCasual, setIsCheckedCasual] = useState(false);
  const { enableZoom, disableZoom } = useZoomContext();
  const { backgroundColor } = useColorContext(); 
  const [scale, setScale] = useState(1);
  const { isVoiceEnabled, toggleVoice , speakText} = useVoiceNavigation();

  const handleZoomToggle = () => {
    const newZoomState = !isCheckedCasual;
    setIsCheckedCasual(newZoomState);
    newZoomState ? enableZoom() : disableZoom();
    speakText(newZoomState ? "Zoom In/Out Mode enabled." : "Zoom In/Out Mode disabled.");
 
  };

  

  const handleVoiceToggle = () => {
    setIsVoiceEnabled((prev) => !prev);
    if (!isVoiceEnabled) {
      speak("Voice navigation enabled.");
    } else {
      speak("Voice navigation disabled.");
    }
  };

  const onPinchEvent = (event) => {
    if (isCheckedCasual) {
      setScale(event.nativeEvent.scale);
    }
  };

  const handleLocationToggle = async () => {
    if (!isCheckedLocation) {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setIsCheckedLocation(true);
        // Optionally retrieve location
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
        speakText("Location access enabled.");
      } else {
        Alert.alert('Permission Denied', 'You need to enable location services.');
        speakText("Location access permission denied.");
      }
    } else {
      // Logic to revoke access if necessary (note: actual revoking is not available in Expo)
      Alert.alert('Location access disabled', 'Location access will be disabled.');
      speakText("Location access disabled.");
      setIsCheckedLocation(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={onPinchEvent}>
        <ScrollView
          style={[styles.scrollView, { backgroundColor }]}
          contentContainerStyle={{ transform: [{ scale }] }}
          maximumZoomScale={3}
          minimumZoomScale={1}
          scrollEnabled={isCheckedCasual}
        >
          <View style={styles.innerContainer}>
          
            <Text style={styles.header}>Just a few clicks away from your</Text>
            <Text style={styles.des}>Dream Wardrobe!</Text>
            <CheckBox
              title="Enable Location"
              checked={isCheckedLocation}
              onPress={handleLocationToggle}
            />

            <CheckBox
              title="Enable Voice Navigation"
              checked={isVoiceEnabled}
              onPress={toggleVoice} // Use the toggle function
            />
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => {
                speakText("Navigating to Colour Vision Accessibility Mode.");
                navigation.navigate("ColourScreen");
              }}
            >
              <Text style={styles.checkboxText}>Colour Vision Accessibility Mode</Text>
              <Icon name="arrow-forward" size={24} color="#000" />
            </TouchableOpacity>
            <CheckBox
              title="Zoom In/Zoom Out Mode"
              checked={isCheckedCasual}
              onPress={handleZoomToggle}
            />
            <Button title="Start" onPress={() => navigation.navigate("calender")} />
          </View>
        </ScrollView>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7336E",
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  des: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Settings;
