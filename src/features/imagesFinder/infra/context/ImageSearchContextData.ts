import { Dispatch, SetStateAction } from "react";
import { Image } from "../../domain/Image";

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
