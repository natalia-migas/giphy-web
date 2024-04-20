import ImageSearch from "../ImageSearch/ImageSearch";
import ImageResults from "../ImageResults/ImageResults";
import { useState } from "react";
import { Image } from "../../domain/imageSearch";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);

  return (
    <>
      <ImageSearch setImages={setImages} />
      <ImageResults images={images} />
    </>
  );
}

export default HomePage;
