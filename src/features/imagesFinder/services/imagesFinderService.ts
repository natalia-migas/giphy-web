import { httpService } from "../../../services/httpService";
import { ImagesFinderService } from "../application/ports";
import { imageAPIResponseSchema } from "../domain/ImagesResponse";

export const imagesFinderService: ImagesFinderService = {
  getImages: async (
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

    return imageAPIResponseSchema.parse(response.data);
  },
};
