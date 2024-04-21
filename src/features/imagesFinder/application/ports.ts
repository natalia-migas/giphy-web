import { ImagesResponse } from "../domain/imagesResponse";

export interface ImagesFinderService {
  getImages: (
    searchString: string,
    offset: number,
    limit: number
  ) => Promise<ImagesResponse>;
}
