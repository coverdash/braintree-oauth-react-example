export interface OAuthTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  refreshToken: string;
  scope: string;
}

export interface TransactionResult {
  success: boolean;
  transaction?: {
    id: string;
    amount: string;
    status: string;
  };
  error?: string;
}
