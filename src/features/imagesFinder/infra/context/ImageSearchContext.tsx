import { createContext, useContext } from "react";
import { ImageSearchContextData } from "../../domain/ImagesSearch";

export const ImageSearchContext = createContext<
  ImageSearchContextData | undefined
>(undefined);

export const useImageSearch = () => {
  const context = useContext(ImageSearchContext);
  if (!context) {
    throw new Error("useImageSearch must be used within a ImageSearchProvider");
  }
  return context;
};
