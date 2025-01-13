import { BraintreeGateway } from "braintree";

export async function createNonce(
  accessToken: string,
  paymentMethodToken: string
): Promise<
  | braintree.ValidatedResponse<braintree.PaymentMethodNonce>
  | { success: false; error: string }
> {
  if (!accessToken) {
    return {
      success: false,
      error: "No access token found. Please connect to Braintree first.",
    };
  }

  try {
    const gateway = new BraintreeGateway({
      accessToken,
    });

    const nonceResult = await gateway.paymentMethod.grant(paymentMethodToken, {
      allowVaulting: true,
      includeBillingPostalCode: true,
    });

    return nonceResult;
  } catch (error) {
    console.error("Transaction error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process transaction",
    };
  }
}
