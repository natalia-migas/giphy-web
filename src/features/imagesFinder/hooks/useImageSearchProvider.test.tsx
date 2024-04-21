import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useImageSearchProvider } from "./useImageSearchProvider";
import * as imagesFinderServiceModule from "../services/imagesFinderService";

jest.mock("../services/imagesFinderService", () => {
  return {
    imagesFinderService: {
      getImages: jest.fn(),
    },
  };
});

beforeEach(() => {
  (
    imagesFinderServiceModule.imagesFinderService.getImages as jest.Mock
  ).mockResolvedValue({
    data: [
      {
        images: { downsized_medium: { url: "http://example.com/image.jpg" } },
        title: "Example",
      },
    ],
    pagination: { total_count: 100, count: 3, offset: 0 },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

interface TestComponentProps {
  onRender?: (props: any) => void;
}

function TestComponent({ onRender }: TestComponentProps) {
  const hookProps = useImageSearchProvider();
  if (onRender) onRender(hookProps);
  return (
    <div>
      <button onClick={() => hookProps.setSearchString("cats")}>
        Change Search
      </button>
      <button onClick={() => hookProps.setShouldTriggerSearch(true)}>
        Trigger Search
      </button>
      <p>{hookProps.error}</p>
      <p>Current Page: {hookProps.currentPage}</p>
      <div>
        {hookProps.images.map((img) => (
          <img key={img.url} src={img.url} alt={img.title} />
        ))}
      </div>
    </div>
  );
}

describe("useImageSearchProvider", () => {
  it("initializes with correct initial state", () => {
    const captureProps = jest.fn();
    render(<TestComponent onRender={captureProps} />);

    expect(captureProps).toHaveBeenCalledWith(
      expect.objectContaining({
        images: [],
        searchString: "",
        currentPage: 0,
        totalPages: 0,
        error: "",
      })
    );
  });

  it("resets currentPage to 0 on searchString change", async () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText("Change Search"));

    const currentPageText = await screen.findByText("Current Page: 0");
    expect(currentPageText).toBeInTheDocument();
  });

  it("fetches images and updates state correctly", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("Change Search"));
    fireEvent.click(screen.getByText("Trigger Search"));

    await waitFor(() => {
      expect(
        imagesFinderServiceModule.imagesFinderService.getImages
      ).toHaveBeenCalledWith("cats", 0, 3);
    });

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", "http://example.com/image.jpg");
  });

  it("handles errors when fetching images", async () => {
    (
      imagesFinderServiceModule.imagesFinderService.getImages as jest.Mock
    ).mockRejectedValue(new Error("Failed to fetch images"));
    render(<TestComponent />);

    fireEvent.click(screen.getByText("Change Search"));
    fireEvent.click(screen.getByText("Trigger Search"));

    const errorMessage = await screen.findByText(
      "Failed to fetch images. Please try again later."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
