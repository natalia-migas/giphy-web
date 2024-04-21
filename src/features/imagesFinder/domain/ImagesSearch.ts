import { Dispatch, SetStateAction } from "react";
import { Image } from "./Image";

export interface ImageSearchFields {
  searchString: string;
  imageText: string;
  position: number;
}

export interface ImageSearchFn {
  onSearch: (args: ImageSearchFields) => void;
}

export interface ImageSearchContextData {
  images: Image[];
  imgText: string;
  textPosition: number;
  currentPage: number;
  totalPages: number;
  searchString: string;
  error: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  setImageText: Dispatch<SetStateAction<string>>;
  setTextPosition: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  searchImages: () => Promise<void>;
  setError: Dispatch<SetStateAction<string>>;
  setShouldTriggerSearch: Dispatch<SetStateAction<boolean>>;
}
