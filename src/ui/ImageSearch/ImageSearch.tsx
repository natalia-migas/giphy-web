import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getImages } from "../../application/imagesApi";
import { Image } from "../../domain/imageSearch";

interface ImageSearchProps {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setImgText: React.Dispatch<React.SetStateAction<string>>;
  setTextPosition: React.Dispatch<React.SetStateAction<number>>;
}

function ImageSearch({
  setImages,
  setImgText,
  setTextPosition,
}: ImageSearchProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [imageText, setImageText] = useState<string>("");
  const [position, setPosition] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const positions = [
    { value: 1, label: "on top of image - center top" },
    { value: 2, label: "on top of image - center bottom" },
    { value: 3, label: "below image - center" },
  ];

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const fetchedImages = await getImages(searchString);
      setImages(
        fetchedImages.data.map((img) => ({
          url: img.images.downsized_medium.url,
          title: img.title,
        }))
      );
      setImgText(imageText);
      setTextPosition(position);
    } catch (error) {
      setError("Failed to fetch images. Please try again later.");
    }
  };

  return (
    <Box component="form" sx={{ p: 5 }} onSubmit={handleSearch}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} textAlign="center">
          <Typography>Search Images:</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="search-image"
            label="Topic"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="displayed-text"
            label="Text to be displayed"
            value={imageText}
            onChange={(e) => setImageText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="text-positioning-label">Text position</InputLabel>
            <Select
              labelId="text-positioning-label"
              id="text-positioning"
              value={position}
              label="Text position"
              onChange={(e) => setPosition(Number(e.target.value))}
            >
              {positions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={1} display="flex" justifyContent="center">
          <Button variant="contained" size="large" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography
          color="error"
          style={{ margin: "20px", textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ImageSearch;
