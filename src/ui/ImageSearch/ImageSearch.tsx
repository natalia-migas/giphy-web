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
import { useEffect, useState } from "react";
import { getImages } from "../../application/imagesApi";
import { Image } from "../../domain/imageSearch";

interface ImageSearchProps {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setImgText: React.Dispatch<React.SetStateAction<string>>;
  setTextPosition: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

function ImageSearch({
  setImages,
  setImgText,
  setTextPosition,
  setCurrentPage,
  setTotalPages,
  currentPage,
}: ImageSearchProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [imageText, setImageText] = useState<string>("");
  const [position, setPosition] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const limit = 3;

  const positions = [
    { value: 1, label: "on top of image - center top" },
    { value: 2, label: "on top of image - center bottom" },
    { value: 3, label: "below image - center" },
  ];

  const fetchImages = async () => {
    setError("");
    try {
      const fetchedImages = await getImages(
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
      setImgText(imageText);
      setTextPosition(position);
      setTotalPages(Math.ceil(fetchedImages.pagination.total_count / limit));
    } catch (error) {
      setError("Failed to fetch images. Please try again later.");
    }
  };

  const handleSearch = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    fetchImages();
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchString, setCurrentPage]);

  useEffect(() => {
    if (searchString) {
      fetchImages();
    }
  }, [currentPage]);

  return (
    <Box component="form" sx={{ p: 5 }} onSubmit={handleSearch}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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
