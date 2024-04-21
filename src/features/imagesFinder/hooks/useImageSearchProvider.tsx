import { useCallback, useEffect, useState } from "react";
import { imagesFinderService } from "../services/imagesFinderService";
import { Image } from "../domain/image";

const limit = 3;

export const useImageSearchProvider = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [imgText, setImageText] = useState<string>("");
  const [textPosition, setTextPosition] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [shouldTriggerSearch, setShouldTriggerSearch] = useState(false);

  const searchImages = useCallback(async () => {
    setError("");
    try {
      const fetchedImages = await imagesFinderService.getImages(
        searchString,
        currentPage * limit,
        limit
      );
      setImages(
        fetchedImages.data.map((img) => ({
          url: img.images.downsized_medium.url,
          title: img.title,
        }))
      );
      setTotalPages(Math.ceil(fetchedImages.pagination.total_count / limit));
    } catch (error) {
      setError("Failed to fetch images. Please try again later.");
    }
    setShouldTriggerSearch(false);
  }, [searchString, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchString]);

  useEffect(() => {
    if (shouldTriggerSearch) {
      searchImages();
    }
  }, [currentPage, shouldTriggerSearch, searchImages]);

  return {
    images,
    imgText,
    textPosition,
    currentPage,
    totalPages,
    searchString,
    error,
    setSearchString,
    setImageText,
    setTextPosition,
    setCurrentPage,
    searchImages,
    setError,
    setShouldTriggerSearch,
  };
};
