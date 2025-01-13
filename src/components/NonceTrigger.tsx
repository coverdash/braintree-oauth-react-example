import React, { useState } from "react";
import { TokenStorage } from "../lib/storage";
import braintree from "braintree";

export function NonceTrigger() {
  const [paymentMethodToken, setPaymentMethodToken] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [dataJson, setDataJson] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const accessToken = TokenStorage.getAccessToken();
      const result = await fetch("http://localhost:9090/api/grant/nonce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, paymentMethodToken }),
      });

      const data: braintree.ValidatedResponse<braintree.PaymentMethodNonce> =
        await result.json();
      TokenStorage.saveTokens({
        access_token: accessToken,
        refresh_token: TokenStorage.getRefreshToken(),
        expires_at: TokenStorage.getExpiresAt(),
        scope: TokenStorage.getScope(),
        merchant_id: TokenStorage.getMerchantId(),
        payment_nonce: data.paymentMethodNonce.nonce,
      });
      setDataJson(JSON.stringify(data, null, 2));

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.message || "Transaction failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-gray-600">
        To process various types of payments as the connected merchant, the
        following must be true:
        <ul className="list-disc list-inside">
          <li>
            You, acting as Merchant B, have approved the OAuth connection
            (provided by Merchant A), which has redirected you to this screen.
          </li>
          <li>
            The OAuth scope includes <code>grant_payment_method</code>. See file{" "}
            <code>src/lib/oauth.ts</code>.
          </li>
          <li>
            The Access Token is saved in order for Merchant A to create a nonce
            to ultimately be shared with Merchant B. (See localStorage.)
          </li>
        </ul>
      </p>
      <p className="text-xs text-gray-600">
        If successful, the a nonce will be returned and can be used by Merchant
        B to process payments. It will be saved in localStorage and referenced
        by the Create Subscription tool.
      </p>
      <div>
        <label
          htmlFor="paymentMethodToken"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Method Token
        </label>
        <p className="text-xs text-gray-500">
          An existing Payment Method Token from Merchant A's Braintree account.
        </p>
        <input
          type="text"
          id="paymentMethodToken"
          value={paymentMethodToken}
          onChange={(e) => setPaymentMethodToken(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {status === "error" && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {status === "success" && (
        <div className="text-green-600 text-sm">Successful!</div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {status === "loading" ? "Processing..." : "Get Nonce"}
      </button>

      {status !== "loading" && dataJson && (
        <div className="text-sm">
          <h3 className="text-sm font-medium text-gray-700">Response</h3>
          <pre>{dataJson}</pre>
        </div>
      )}
    </form>
  );
}
