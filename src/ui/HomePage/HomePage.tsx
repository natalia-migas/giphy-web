import ImageSearch from "../ImageSearch/ImageSearch";
import ImageResults from "../ImageResults/ImageResults";
import { useState } from "react";
import { Image } from "../../domain/imageSearch";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);
  const [imgText, setImgText] = useState<string>("");
  const [textPosition, setTextPosition] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <>
      <ImageSearch
        setImages={setImages}
        setImgText={setImgText}
        setTextPosition={setTextPosition}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
        currentPage={currentPage}
      />
      <ImageResults
        images={images}
        imgText={imgText}
        textPosition={textPosition}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default HomePage;
