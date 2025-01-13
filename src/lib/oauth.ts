import { BRAINTREE_CONFIG } from "./config";

export function generateOAuthURL() {
  if (!BRAINTREE_CONFIG.merchantId || !BRAINTREE_CONFIG.clientId) {
    throw new Error("Missing required Braintree configuration");
  }

  const params = new URLSearchParams({
    merchant_id: BRAINTREE_CONFIG.merchantId,
    client_id: BRAINTREE_CONFIG.clientId,
    redirect_uri: BRAINTREE_CONFIG.redirectUri,
    scope: ["grant_payment_method", "shared_vault_transactions"].join(","),
  } as Record<string, string>);

  console.log(BRAINTREE_CONFIG);
  console.log(params.toString());

  const url = `https://${
    BRAINTREE_CONFIG.environment === "sandbox" ? "sandbox." : ""
  }braintreegateway.com/oauth/connect?${params.toString()}`;
  return url;
}
