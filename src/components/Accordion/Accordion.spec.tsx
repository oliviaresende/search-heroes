import { render, screen } from "@testing-library/react";
import MyAccordion from "./Accordion";

describe("MyAccordion Component Tests", () => {
  test("Renders accordion title correctly", () => {
    const title = "Accordion Title";
    render(<MyAccordion title={title} contentData="Accordion Content" />);

    const accordionTitle = screen.getByText(title);
    expect(accordionTitle).toBeInTheDocument();
  });

  test("Renders string content correctly", () => {
    const content = "This is a string content";
    render(<MyAccordion title="Accordion Title" contentData={content} />);

    const accordionContent = screen.getByText(content);
    expect(accordionContent).toBeInTheDocument();
  });

  test("Renders array content correctly", () => {
    const contentData = [
      {
        id: 1,
        title: "Item 1",
        thumbnail: { extension: "jpg", path: "/path/to/image" },
      },
      {
        id: 2,
        title: "Item 2",
        thumbnail: { extension: "jpg", path: "/path/to/image" },
      },
    ];
    render(<MyAccordion title="Accordion Title" contentData={contentData} />);

    contentData.forEach((item) => {
      const itemTitle = screen.getByText(item.title);
      expect(itemTitle).toBeInTheDocument();
    });
  });
});
