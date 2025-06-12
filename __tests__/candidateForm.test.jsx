import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CandidateForm from "@/app/forms/candidateForm";
import axios from "axios";

jest.mock("axios");

describe("CandidateForm validation", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({});
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<CandidateForm />);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Full name is required")).toBeInTheDocument();
    expect(await screen.findByText("Mobile number must be 10 digits")).toBeInTheDocument();
  });
});
