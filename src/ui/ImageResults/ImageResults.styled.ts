import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { TEXT_POSITIONS } from "../../constants";

export const ImageContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 0 !important;
  margin-top: 100px;
  position: relative;
`;

export const StyledImage = styled.img`
  height: auto;
  max-width: 400px;
`;

export const TextOverlay = styled(Typography)<{ textPosition: number }>`
  position: absolute;
  width: 100%;
  color: white;
  text-align: center;
  font-weight: bold;
  max-width: 350px;
  -webkit-text-stroke: 2px black;
  font-family: Arial Black;
  ${({ textPosition }) => {
    switch (textPosition) {
      case TEXT_POSITIONS.TOP_CENTER:
        return "top: 10px;";
      case TEXT_POSITIONS.BOTTOM_CENTER:
        return "bottom: 10px;";
      case TEXT_POSITIONS.BELOW_IMAGE:
        return "bottom: -80px;";
      default:
        return "";
    }
  }}
`;

export const Navigation = styled(Grid)`
  background: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 20px;
`;
