/* eslint-disable @typescript-eslint/ban-ts-comment */
export const BRAINTREE_CONFIG = {
  // @ts-ignore
  merchantId: import.meta.env.VITE_BRAINTREE_MERCHANT_ID,
  clientId: `client_id$sandbox$${
    // @ts-ignore
    import.meta.env.VITE_BRAINTREE_OAUTH_CLIENT_ID
  }`,
  // @ts-ignore
  redirectUri: import.meta.env.VITE_BRAINTREE_REDIRECT_URI,
  // @ts-ignore
  environment: import.meta.env.VITE_BRAINTREE_ENVIRONMENT,
};

// @ts-ignore
export const API_BASE_URL = import.meta.env.PROD
  ? "" // Empty string will use the same domain in production
  : "http://localhost:9090";
