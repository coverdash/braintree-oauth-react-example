import braintree from "braintree";

// These would typically come from environment variables
const CLIENT_ID = process.env.BRAINTREE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.BRAINTREE_OAUTH_CLIENT_SECRET;

export const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  clientId: CLIENT_ID ?? "",
  clientSecret: CLIENT_SECRET ?? "",
});
