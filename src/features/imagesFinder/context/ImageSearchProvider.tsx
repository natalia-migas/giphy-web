import React from "react";
import { useImageSearchProvider } from "../hooks/useImageSearchProvider";
import { ImageSearchContext } from "./ImageSearchContext";

function ImageSearchProvider({ children }: { children: React.ReactNode }) {
  const value = useImageSearchProvider();
  return (
    <ImageSearchContext.Provider value={value}>
      {children}
    </ImageSearchContext.Provider>
  );
}

export default ImageSearchProvider;
