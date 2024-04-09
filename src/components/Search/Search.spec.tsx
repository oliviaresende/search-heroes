import { fireEvent, render } from "@testing-library/react";
import Search from "./Search";

describe("Search Component Tests", () => {
  test("renders component correctly", () => {
    render(<Search onSearch={() => {}} />);
  });

  test("handles text input correctly", () => {
    const { getByPlaceholderText } = render(<Search onSearch={() => {}} />);
    const input = getByPlaceholderText("Search the hero by name");
    fireEvent.change(input, { target: { value: "Spider-Man" } });
    expect(input).toHaveValue("Spider-Man");
  });

  test("clears search text when clear button is clicked", () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <Search onSearch={() => {}} />
    );
    const input = getByPlaceholderText("Search the hero by name");
    fireEvent.change(input, { target: { value: "Spider-Man" } });
    const clearButton = getByLabelText("Clean");
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });

  test("calls onSearch when search button is clicked with search text", () => {
    const onSearchMock = vi.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <Search onSearch={onSearchMock} />
    );
    const input = getByPlaceholderText("Search the hero by name");
    fireEvent.change(input, { target: { value: "Spider-Man" } });
    const searchButton = getByLabelText("Search");
    fireEvent.click(searchButton);
    expect(onSearchMock).toHaveBeenCalledWith("Spider-Man");
  });

  test("disables search button when no search text is present", () => {
    const onSearchMock = vi.fn();
    const { getByLabelText } = render(<Search onSearch={onSearchMock} />);
    const searchButton = getByLabelText("Disabled");
    expect(searchButton).toBeDisabled();
  });
});
