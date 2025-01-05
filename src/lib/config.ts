/* eslint-disable @typescript-eslint/ban-ts-comment */
export const BRAINTREE_CONFIG = {
  // @ts-ignore
  merchantId: import.meta.env.VITE_BRAINTREE_MERCHANT_ID,
  // @ts-ignore
  clientId: import.meta.env.VITE_BRAINTREE_OAUTH_CLIENT_ID,
  redirectUri: "http://localhost:5173/oauth-callback",
  // @ts-ignore
  environment: import.meta.env.VITE_BRAINTREE_ENVIRONMENT,
};
