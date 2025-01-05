import { KeyRound } from "lucide-react";
import { generateOAuthURL } from "../lib/oauth";

export function ConnectButton() {
  const handleConnect = () => {
    // This will redirect the merchant to Braintree's OAuth page
    window.location.href = generateOAuthURL();
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      <KeyRound size={20} />
      <span>Connect to Braintree</span>
    </button>
  );
}
