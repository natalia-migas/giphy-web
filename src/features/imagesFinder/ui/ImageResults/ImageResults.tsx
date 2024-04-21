import { Grid, Container, Button } from "@mui/material";
import {
  ImageContainer,
  StyledImage,
  TextOverlay,
  Navigation,
} from "./ImageResults.styled";
import { useImageSearch } from "../../infra/context/ImageSearchContext";

function ImageResults() {
  const {
    images,
    imgText,
    textPosition,
    currentPage,
    totalPages,
    setCurrentPage,
    setShouldTriggerSearch,
  } = useImageSearch();

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setShouldTriggerSearch(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShouldTriggerSearch(true);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container sx={{ marginBottom: 20 }}>
        {images.map((img, index) => (
          <ImageContainer item xs={12} md={4} key={index}>
            <StyledImage src={img.url} alt={`${img.title}-${index}`} />
            {imgText && (
              <TextOverlay variant="h6" textPosition={textPosition}>
                {imgText.toUpperCase()}
              </TextOverlay>
            )}
          </ImageContainer>
        ))}
      </Grid>
      <Navigation justifyContent="center">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          variant="contained"
          sx={{ marginRight: 3 }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          variant="contained"
        >
          Next
        </Button>
      </Navigation>
    </Container>
  );
}

export default ImageResults;
