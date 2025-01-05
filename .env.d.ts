/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAINTREE_MERCHANT_ID: string;
  readonly VITE_BRAINTREE_OAUTH_CLIENT_ID: string;
  readonly VITE_BRAINTREE_OAUTH_CLIENT_SECRET: string;
  readonly VITE_BRAINTREE_ENVIRONMENT: "sandbox" | "production";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
