import { useState } from "react";
import { KeyRound } from "lucide-react";
// import { gateway } from '../lib/braintree';

export function OAuthConnect() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      // In a real implementation, this would redirect to Braintree's OAuth page
      // const connectUrl = await gateway.oauth.connectUrl({
      //   redirectUri: 'http://localhost:5173/oauth-callback',
      //   scope: 'grant_payment_method,shared_vault_transactions'
      // });

      // Simulate successful connection for testing
      setConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <div className="flex items-center space-x-4">
        <KeyRound className={connected ? "text-green-500" : "text-gray-400"} />
        <div>
          <h2 className="text-xl font-medium text-black">OAuth Connection</h2>
          <p className="text-gray-500">
            {connected
              ? "Connected to partner merchant"
              : "Connect to partner merchant"}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <button
        onClick={handleConnect}
        disabled={connected}
        className={`mt-4 w-full py-2 px-4 rounded ${
          connected
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {connected ? "Connected" : "Connect"}
      </button>
    </div>
  );
}
