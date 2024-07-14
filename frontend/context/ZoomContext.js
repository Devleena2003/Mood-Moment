import React, { createContext, useContext, useState } from 'react';

const ZoomContext = createContext();

export const useZoomContext = () => useContext(ZoomContext);

export const ZoomProvider = ({ children }) => {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);

  const enableZoom = () => setIsZoomEnabled(true);
  const disableZoom = () => setIsZoomEnabled(false);

  return (
    <ZoomContext.Provider value={{ isZoomEnabled, enableZoom, disableZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};
