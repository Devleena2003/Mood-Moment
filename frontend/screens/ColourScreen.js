import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPicker from 'react-native-wheel-color-picker';
import { useColorContext } from "../context/ColorContext";
import Slider from '@react-native-community/slider';
import { useTextSizeContext } from '../context/TextSizeContext';
import { useVoiceNavigation } from '../context/VoiceNavigationContext'; // Import the context

const ColourScreen = () => {
  const { setBackgroundColor } = useColorContext();
  const [color, setColor] = useState('');
  const { zoomFactor, setZoomFactor } = useTextSizeContext(); 
  const {speakText} = useVoiceNavigation();

  const onColorChange = (color) => {
    setColor(color);
    setBackgroundColor(color); 
  };

  useEffect(() => {
    // Speak when the component mounts
    speakText("Choose your preferable colors and font size for a better visual experience");
  }, [speakText]);
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: 18 * zoomFactor }]}>Customize the app with</Text>
      <Text style={[styles.subHeader, { fontSize: 24 * zoomFactor }]}>
        Your preferable colours for a better visual experience
      </Text>

      <Text style={[styles.label, { fontSize: 16 * zoomFactor }]}>Pick a Color:</Text>
      <ColorPicker
        color={color}
        onColorChange={onColorChange}
        thumbSize={30}
        sliderSize={30}
        noSnap={true}
        row={false}
      />
      
      <Text style={[styles.label, { fontSize: 16 * zoomFactor }]}>Font Size:</Text>
      <Slider
        style={styles.slider}
        minimumValue={1} // No zoom
        maximumValue={1.5} // Double size
        value={zoomFactor}
        onValueChange={setZoomFactor}
        step={0.1}
        minimumTrackTintColor="#FFA500"
        maximumTrackTintColor="#D3D3D3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 18, // Base size
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 24, // Base size
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16, // Base size
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ColourScreen;
