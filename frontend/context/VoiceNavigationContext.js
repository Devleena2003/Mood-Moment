// VoiceNavigationContext.js
import React, { createContext, useContext, useState } from 'react';
import { speak } from '../components/texttospeech'; // Ensure this is correctly imported

const VoiceNavigationContext = createContext();

export const VoiceNavigationProvider = ({ children }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const toggleVoice = () => {
    setIsVoiceEnabled((prev) => {
      const newState = !prev;
      speak(newState ? "Voice navigation enabled." : "Voice navigation disabled.");
      return newState;
    });
  };

  const speakText = (text) => {
    if (isVoiceEnabled) {
      speak(text);
    }
  };

  return (
    <VoiceNavigationContext.Provider value={{ isVoiceEnabled, toggleVoice, speakText }}>
      {children}
    </VoiceNavigationContext.Provider>
  );
};

export const useVoiceNavigation = () => useContext(VoiceNavigationContext);
