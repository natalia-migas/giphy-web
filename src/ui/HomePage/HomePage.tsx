import ImageSearch from "../ImageSearch/ImageSearch";
import ImageResults from "../ImageResults/ImageResults";
import { useState } from "react";
import { Image } from "../../domain/imageSearch";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);
  const [imgText, setImgText] = useState<string>("");
  const [textPosition, setTextPosition] = useState<number>(1);

  return (
    <>
      <ImageSearch
        setImages={setImages}
        setImgText={setImgText}
        setTextPosition={setTextPosition}
      />
      <ImageResults
        images={images}
        imgText={imgText}
        textPosition={textPosition}
      />
    </>
  );
}

export default HomePage;
