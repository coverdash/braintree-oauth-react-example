import React, { useState } from "react";
import { TokenStorage } from "../lib/storage";

export function SubscriptionForm() {
  const [downPayment, setDownPayment] = useState("");
  const [price, setPrice] = useState("");
  const [planId, setPlanId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [dataJson, setDataJson] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const paymentMethodNonce = TokenStorage.getPaymentNonce();
      const result = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodNonce,
          planId,
          downPayment,
          price,
        }),
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
      <p className="text-xs text-gray-600">
        To create a subscription as the connected merchant, the following must
        be true:
        <ul className="list-disc list-inside">
          <li>
            A nonce has been created by Merchant A and is saved in localStorage.
          </li>
          <li>
            The following environment variables are set in the server for{" "}
            <b>Merchant B</b>: <code>BRAINTREE_PUBLIC_KEY</code>,{" "}
            <code>BRAINTREE_PRIVATE_KEY</code>, and{" "}
            <code>BRAINTREE_MERCHANT_ID</code>.
          </li>
          <li>
            A Plan exists in Merchant B's Braintree account so the Plan ID can
            be entered in the form below.
          </li>
        </ul>
      </p>
      <p className="text-xs text-gray-600">
        If successful, a new Customer and Payment Method will be created in
        Merchant B's Braintree account using the nonce created in the previous
        step. In addition, a new Subscription will be created for that Customer
        and their Payment Method.
      </p>
      <div>
        <label
          htmlFor="downPayment"
          className="block text-sm font-medium text-gray-700"
        >
          Down Payment
        </label>
        <input
          type="number"
          id="downPayment"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="planId"
          className="block text-sm font-medium text-gray-700"
        >
          Plan ID
        </label>
        <input
          type="text"
          id="planId"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {status === "error" && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {status === "success" && (
        <div className="text-green-600 text-sm">Subscription successful!</div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {status === "loading" ? "Processing..." : "Create Subscription"}
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
