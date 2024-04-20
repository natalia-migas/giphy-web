import { httpService } from "../services/httpService";
import { ImageAPIResponseSchema } from "../domain/apiSchema";

export const getImages = async (searchString: string) => {
  const response = await httpService.get(
    "https://api.giphy.com/v1/stickers/search",
    {
      params: new URLSearchParams({
        q: searchString,
        limit: "3",
        rating: "g",
        api_key: "1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq",
      }),
    }
  );

  const result = ImageAPIResponseSchema.parse(response.data);
  return result;
};
