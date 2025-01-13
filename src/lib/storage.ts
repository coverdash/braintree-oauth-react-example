// Secure storage utilities for OAuth tokens
const STORAGE_KEYS = {
  ACCESS_TOKEN: "braintree_access_token",
  REFRESH_TOKEN: "braintree_refresh_token",
  MERCHANT_ID: "connected_merchant_id",
  SCOPE: "braintree_scope",
  EXPIRES_AT: "braintree_expires_at",
  PAYMENT_NONCE: "braintree_payment_nonce",
} as const;

export const TokenStorage = {
  saveTokens: (tokens: {
    access_token: string;
    refresh_token: string;
    expires_at: string;
    scope: string;
    merchant_id: string;
    payment_nonce: string;
  }) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
    localStorage.setItem(STORAGE_KEYS.MERCHANT_ID, tokens.merchant_id);
    localStorage.setItem(STORAGE_KEYS.SCOPE, tokens.scope);
    localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, tokens.expires_at);
    localStorage.setItem(STORAGE_KEYS.PAYMENT_NONCE, tokens.payment_nonce);
  },

  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? "",
  getMerchantId: () => localStorage.getItem(STORAGE_KEYS.MERCHANT_ID) ?? "",
  clearTokens: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.MERCHANT_ID);
  },
  getPaymentNonce: () => localStorage.getItem(STORAGE_KEYS.PAYMENT_NONCE) ?? "",
  getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ?? "",
  getScope: () => localStorage.getItem(STORAGE_KEYS.SCOPE) ?? "",
  getExpiresAt: () => localStorage.getItem(STORAGE_KEYS.EXPIRES_AT) ?? "",
};
