import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/loginSignup";

test("renders a text", () => {
  render(<Login />);
  const remember = screen.getAllByText("Remember me");
  expect(remember).toBeInTheDocument();
});

test("has forgot password option", () => {
  render(<Login />);
  const forgot = screen.getByText("Forgot password?");
  expect(forgot).toBeInTheDocument();
});

test("renders sign in form", () => {
  render(<Login />);

  const githubU = screen.getByText("GitHub Username\n *");
  expect(githubU).toBeInTheDocument();

  const password = screen.getByText("Password");
  expect(password).toBeInTheDocument();
});
