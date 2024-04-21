export interface ImageSearchFields {
  searchString: string;
  imageText: string;
  position: number;
}

export interface ImageSearchFn {
  onSearch: (args: ImageSearchFields) => void;
}
