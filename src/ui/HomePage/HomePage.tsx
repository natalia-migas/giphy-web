import ImageSearch from "../ImageSearch/ImageSearch";
import ImageResults from "../ImageResults/ImageResults";
import { useState } from "react";

function HomePage() {
  const [images, setImages] = useState<string[]>([]);

  console.log("images", images);
  return (
    <>
      <ImageSearch setImages={setImages} />
      <ImageResults />
    </>
  );
}

export default HomePage;
