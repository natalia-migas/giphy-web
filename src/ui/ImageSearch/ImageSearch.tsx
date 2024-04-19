import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ImageSearch() {
  const [searchString, setSearchString] = useState("");
  const [imageText, setImageText] = useState("");
  const [position, setPosition] = useState(1);

  const positions = [
    { value: 1, label: "on top of image - center top" },
    { value: 2, label: "on top of image - center bottom" },
    { value: 3, label: "below image - center" },
  ];

  const handleSearch = () => {
    console.log(searchString, imageText, position);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 5 }}
      gap={2}
    >
      <Typography>Search Images:</Typography>

      <TextField
        id="search-image"
        label="Topic"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <TextField
        id="displayed-text"
        label="Text to be displayed"
        value={imageText}
        onChange={(e) => setImageText(e.target.value)}
      />
      <FormControl sx={{ minWidth: 280 }}>
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
      <Button variant="contained" size="large" onClick={handleSearch}>
        Submit
      </Button>
    </Box>
  );
}

export default ImageSearch;
