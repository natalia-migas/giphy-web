import { render, fireEvent, screen } from "@testing-library/react";
import ImageResults from "./ImageResults";
import { ImageSearchContext } from "../../infra/context/ImageSearchContext";
import { ReactNode } from "react";

const mockSetCurrentPage = jest.fn();
const mockSetShouldTriggerSearch = jest.fn();
const mockSetSearchString = jest.fn();
const mockSetImageText = jest.fn();
const mockSetTextPosition = jest.fn();
const mockSearchImages = jest.fn();
const mockSetError = jest.fn();

const createWrapper = (overrideValues = {}) => {
  const defaultValues = {
    images: [
      { url: "http://example.com/image1.jpg", title: "Image 1" },
      { url: "http://example.com/image2.jpg", title: "Image 2" },
    ],
    imgText: "Test",
    textPosition: 1,
    currentPage: 1,
    totalPages: 3,
    setCurrentPage: mockSetCurrentPage,
    setShouldTriggerSearch: mockSetShouldTriggerSearch,
    searchString: "",
    error: "",
    setSearchString: mockSetSearchString,
    setImageText: mockSetImageText,
    setTextPosition: mockSetTextPosition,
    searchImages: mockSearchImages,
    setError: mockSetError,
    ...overrideValues,
  };

  return ({ children }: { children: ReactNode }) => (
    <ImageSearchContext.Provider value={defaultValues}>
      {children}
    </ImageSearchContext.Provider>
  );
};

describe("ImageResults", () => {
  it("renders images correctly", () => {
    const wrapper = createWrapper();
    render(<ImageResults />, { wrapper });

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "http://example.com/image1.jpg");
    expect(images[1]).toHaveAttribute("src", "http://example.com/image2.jpg");
  });

  it("disables 'Previous' button on the first page", () => {
    const wrapper = createWrapper({ currentPage: 0 });
    render(<ImageResults />, { wrapper });

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("disables 'Next' button on the last page", () => {
    const wrapper = createWrapper({ currentPage: 2 });
    render(<ImageResults />, { wrapper });

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("handles navigation clicks correctly", () => {
    const wrapper = createWrapper();
    render(<ImageResults />, { wrapper });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    expect(mockSetShouldTriggerSearch).toHaveBeenCalledWith(true);

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(0);
    expect(mockSetShouldTriggerSearch).toHaveBeenCalledWith(true);
  });
});
