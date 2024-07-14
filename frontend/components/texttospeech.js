import * as Speech from 'expo-speech';

export const speak = (text) => {
  if (text) {
    Speech.speak(text, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  } else {
    console.error("No text provided to speak.");
  }
};
