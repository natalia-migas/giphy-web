import { Typography, Grid, Container } from "@mui/material";
import { Image } from "../../domain/imageSearch";
import {
  ImageContainer,
  StyledImage,
  TextOverlay,
} from "./ImageResults.styled";

interface ImageResultsProps {
  images: Image[];
  imgText: string;
  textPosition: number;
}

function ImageResults({ images, imgText, textPosition }: ImageResultsProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5">Image Results</Typography>
      <Grid container spacing={10}>
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
    </Container>
  );
}

export default ImageResults;
