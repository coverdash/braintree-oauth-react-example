import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { TokenStorage } from "../lib/storage";
import type { OAuthTokenResponse } from "../lib/types";

export function OAuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const merchantId = params.get("merchantId");

      if (!code) {
        setStatus("error");
        setError("No authorization code received");
        return;
      }

      try {
        const response = await fetch("/api/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Failed to exchange token");
        }

        const tokens: OAuthTokenResponse = await response.json();

        TokenStorage.saveTokens({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: tokens.expiresAt,
          scope: tokens.scope,
          merchant_id: merchantId ?? "",
          payment_nonce: "",
        });

        setStatus("success");
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Failed to exchange token"
        );
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            <p className="mt-4 text-gray-600">Connecting to Braintree...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-green-500">
            <CheckCircle size={48} />
            <p className="mt-4 text-center">
              Successfully connected! Redirecting...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center text-red-500">
            <XCircle size={48} />
            <p className="mt-4 text-center">Connection failed: {error}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
