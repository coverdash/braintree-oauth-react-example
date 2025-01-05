import React, { useState } from "react";
import { TokenStorage } from "../lib/storage";

export function PaymentForm() {
  const [amount, setAmount] = useState("");
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
      const result = await fetch("http://localhost:9090/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, amount, paymentMethodToken }),
      });

      const data = await result.json();
      setDataJson(JSON.stringify(data, null, 2));

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.error || data.message || "Transaction failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="paymentMethodToken"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Method Token
        </label>
        <input
          type="text"
          id="paymentMethodToken"
          value={paymentMethodToken}
          onChange={(e) => setPaymentMethodToken(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {status === "error" && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {status === "success" && (
        <div className="text-green-600 text-sm">Transaction successful!</div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {status === "loading" ? "Processing..." : "Process Payment"}
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
