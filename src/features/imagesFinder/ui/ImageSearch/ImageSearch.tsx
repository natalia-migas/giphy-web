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
import { useImageSearch } from "../../infra/context/ImageSearchContext";

function ImageSearch() {
  const {
    setSearchString,
    setImageText,
    setTextPosition,
    searchString,
    imgText,
    textPosition,
    error,
    setShouldTriggerSearch,
  } = useImageSearch();

  const positions = [
    { value: 1, label: "on top of image - center top" },
    { value: 2, label: "on top of image - center bottom" },
    { value: 3, label: "below image - center" },
  ];

  const handleSearch = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    setShouldTriggerSearch(true);
  };

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
            value={imgText}
            onChange={(e) => setImageText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="text-positioning-label">Text position</InputLabel>
            <Select
              labelId="text-positioning-label"
              id="text-positioning"
              value={textPosition}
              label="Text position"
              onChange={(e) => setTextPosition(Number(e.target.value))}
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
