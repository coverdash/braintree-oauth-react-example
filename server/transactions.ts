import { BraintreeGateway } from "braintree";
// import { BRAINTREE_CONFIG } from "./config";
import type { TransactionResult } from "../src/lib/types";

export async function createTransaction(
  accessToken: string,
  amount: string,
  paymentMethodToken: string
): Promise<TransactionResult> {
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

    const result = await gateway.transaction.sale({
      amount,
      sharedPaymentMethodToken: paymentMethodToken,
    });

    return result;
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

  // try {
  //   const response = await fetch(
  //     `https://${
  //       BRAINTREE_CONFIG.environment
  //     }.braintreegateway.com/merchants/${TokenStorage.getMerchantId()}/transactions`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         transaction: {
  //           amount,
  //           shared_payment_method_token: paymentMethodToken,
  //         },
  //       }),
  //     }
  //   );

  //   const result = await response.json();

  //   return {
  //     success: result.success,
  //     transaction: result.transaction,
  //     error: result.error?.message,
  //   };
  // } catch (error) {
  //   return {
  //     success: false,
  //     error:
  //       error instanceof Error
  //         ? error.message
  //         : "Failed to process transaction",
  //   };
  // }
}
