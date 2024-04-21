import { ImagesResponse } from "../domain/ImagesResponse";

export interface ImagesFinderService {
  getImages: (
    searchString: string,
    offset: number,
    limit: number
  ) => Promise<ImagesResponse>;
}
