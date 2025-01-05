import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectButton } from "./components/ConnectButton";
import { OAuthCallback } from "./components/OAuthCallback";
import { PaymentForm } from "./components/PaymentForm";
import { TokenStorage } from "./lib/storage";

function Home() {
  const isConnected = !!TokenStorage.getAccessToken();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Braintree OAuth Integration
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          {!isConnected ? (
            <>
              <h2 className="text-xl mb-4">Connect Your Braintree Account</h2>
              <p className="text-gray-600 mb-6">
                Click below to connect your Braintree account and enable payment
                processing.
              </p>
              <ConnectButton />
            </>
          ) : (
            <>
              <h2 className="text-xl mb-4">Process Payment</h2>
              <p className="text-gray-600 mb-6">
                Your account is connected. You can now process payments.
              </p>
              <PaymentForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
