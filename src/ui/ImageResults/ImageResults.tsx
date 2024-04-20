import { Typography, Grid, Container } from "@mui/material";
import { Image } from "../../domain/imageSearch";

interface ImageResultsProps {
  images: Image[];
}

function ImageResults({ images }: ImageResultsProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Images Results</Typography>
      <Grid container spacing={10}>
        {images.map((img, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={`${img.url}`}
              alt={`${img.title}-${index}`}
              style={{ height: "auto", maxWidth: 400 }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ImageResults;
