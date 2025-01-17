/* eslint-disable @typescript-eslint/ban-ts-comment */
export const BRAINTREE_CONFIG = {
  // @ts-ignore
  merchantId: import.meta.env.VITE_BRAINTREE_MERCHANT_ID,
  // @ts-ignore
  clientId: import.meta.env.VITE_BRAINTREE_OAUTH_CLIENT_ID,
  // @ts-ignore
  redirectUri: import.meta.env.VITE_BRAINTREE_REDIRECT_URI,
  // @ts-ignore
  environment: import.meta.env.VITE_BRAINTREE_ENVIRONMENT,
};
