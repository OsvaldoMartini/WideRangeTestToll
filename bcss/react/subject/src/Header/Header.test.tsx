import {render, waitFor, screen, prettyDOM} from '@testing-library/react'

import Header from "./Header";

it("renders with or without a user",async () => {
  render(<Header />);
  await waitFor(() => screen.getByTestId("header"));

  console.log(prettyDOM(screen.getByTestId("header")));

  expect(screen.getByTestId("header")).toHaveTextContent("Bowel Cancer Screening System");
});