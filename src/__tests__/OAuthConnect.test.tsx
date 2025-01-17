import { describe, it, expect, vi } from "vitest";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render, screen, fireEvent } from "@testing-library/react";
import { OAuthConnect } from "../components/OAuthConnect";
import braintree from "braintree";

const environment = process.env.BRAINTREE_ENVIRONMENT || "sandbox";
const clientId = `client_id$${environment}$${process.env.BRAINTREE_OAUTH_CLIENT_ID}`;
const clientSecret = `client_secret$${environment}$${process.env.BRAINTREE_OAUTH_CLIENT_SECRET}`;

export const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  clientId: clientId ?? "",
  clientSecret: clientSecret ?? "",
});

// Mock the Braintree gateway
vi.mock("../lib/braintree", () => ({
  gateway: {
    oauth: {
      connectUrl: vi.fn(),
    },
  },
}));

describe("OAuthConnect", () => {
  it("renders connect button initially", () => {
    render(<OAuthConnect />);
    expect(screen.getByText("Connect")).toBeDefined();
  });

  it("shows success state after successful connection", async () => {
    // Mock successful connection
    vi.mocked(gateway.oauth.connectUrl).mockResolvedValueOnce(
      "https://sandbox.braintreegateway.com/oauth/connect"
    );

    render(<OAuthConnect />);

    const connectButton = screen.getByText("Connect");
    await fireEvent.click(connectButton);

    expect(screen.getByText("Connected")).toBeDefined();
  });

  it("shows error message on connection failure", async () => {
    // Mock connection failure
    vi.mocked(gateway.oauth.connectUrl).mockRejectedValueOnce(
      new Error("Connection failed")
    );

    render(<OAuthConnect />);

    const connectButton = screen.getByText("Connect");
    await fireEvent.click(connectButton);

    expect(screen.getByText("Failed to connect")).toBeDefined();
  });
});
