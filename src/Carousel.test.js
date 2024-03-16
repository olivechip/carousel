import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("it renders without crashing", () => {
  render(<Carousel />);
});

test("it matches snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect (asFragment()).toMatchSnapshot();
});

test("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  fireEvent.click(rightArrow);

  // expect the third image to show, but not the second
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
});

test("left arrow works", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // expect the second image to show, but not the third
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
    
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

test("missing left arrow", () => {
  const { queryByTestId } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");

  expect(leftArrow).not.toBeInTheDocument();
})

test("missing right arrow", () => {
  const { queryByTestId } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(rightArrow).not.toBeInTheDocument();
})