import ImageSearch from "../ImageSearch/ImageSearch";
import ImageResults from "../ImageResults/ImageResults";
import ImageSearchProvider from "../../context/ImageSearchProvider";

function ImagesFinderPage() {
  return (
    <ImageSearchProvider>
      <ImageSearch />
      <ImageResults />
    </ImageSearchProvider>
  );
}

export default ImagesFinderPage;
