import { httpService } from "../services/httpService";
import { ImageAPIResponseSchema } from "../domain/apiSchema";

export const getImages = async (
  searchString: string,
  offset: number = 0,
  limit: number = 3
) => {
  const response = await httpService.get(
    "https://api.giphy.com/v1/stickers/search",
    {
      params: new URLSearchParams({
        q: searchString,
        limit: limit.toString(),
        rating: "g",
        api_key: "1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq",
        offset: offset.toString(),
      }),
    }
  );

  const result = ImageAPIResponseSchema.parse(response.data);
  return result;
};
