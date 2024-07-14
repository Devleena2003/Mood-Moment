// context/TextSizeContext.js
import React, { createContext, useContext, useState } from 'react';

const TextSizeContext = createContext();

export const TextSizeProvider = ({ children }) => {
  const [zoomFactor, setZoomFactor] = useState(1); // Default zoom factor

  return (
    <TextSizeContext.Provider value={{ zoomFactor, setZoomFactor }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export const useTextSizeContext = () => {
  return useContext(TextSizeContext);
};
