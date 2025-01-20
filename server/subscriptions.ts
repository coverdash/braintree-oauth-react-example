import { BraintreeGateway, Environment } from "braintree";
import dayjs from "dayjs";

export async function createSubscription(
  paymentMethodNonce: string,
  planId: string,
  downPayment: string,
  price: string
): Promise<
  | {
      success: true;
      transactionResult: braintree.ValidatedResponse<braintree.Transaction>;
      subscriptionResult: braintree.ValidatedResponse<braintree.Subscription>;
    }
  | { success: boolean; error: string }
> {
  console.log("body", { paymentMethodNonce, planId, price, downPayment });
  if (!paymentMethodNonce || !planId || !price || !downPayment) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  console.log("paymentMethodNonce", paymentMethodNonce);
  console.log("planId", planId);

  const environment = Environment.Sandbox; // Adjust this to match your environment
  const merchantId = process.env.BRAINTREE_MERCHANT_ID || "";
  const publicKey = process.env.BRAINTREE_PUBLIC_KEY || "";
  const privateKey = process.env.BRAINTREE_PRIVATE_KEY || "";

  console.log("environment", environment);
  console.log("merchantId", merchantId);
  console.log("publicKey", publicKey);
  console.log("privateKey", privateKey);

  try {
    const gateway = new BraintreeGateway({
      environment,
      merchantId,
      publicKey,
      privateKey,
    });

    console.log("gateway", gateway);

    const customerResult = await gateway.customer.create({
      firstName: generateRandomString(5),
      lastName: generateRandomString(5),
      email: generateRandomEmail(),
    });

    console.log("customerResult", customerResult);

    const paymentMethodResult = await gateway.paymentMethod.create({
      customerId: customerResult.customer.id,
      paymentMethodNonce: paymentMethodNonce,
      options: {
        verifyCard: true,
      },
    });

    console.log("paymentMethodResult", paymentMethodResult);

    const transactionResult = await gateway.transaction.sale({
      amount: downPayment,
      paymentMethodToken: paymentMethodResult.paymentMethod.token,
      options: {
        submitForSettlement: true,
      },
    });

    // console.log("transactionResult", transactionResult);

    const subscriptionResult = await gateway.subscription.create({
      paymentMethodToken: paymentMethodResult.paymentMethod.token,
      planId: planId,
      price,
      firstBillingDate: dayjs().add(2, "month").toDate(),
      numberOfBillingCycles: 10,
    });

    // console.log("subscriptionResult", subscriptionResult);
    return {
      success: true,
      transactionResult,
      subscriptionResult,
    };
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

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomEmail(): string {
  const domains = ["example.com", "test.com", "demo.com"];
  const firstName = generateRandomString(5);
  const lastName = generateRandomString(5);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}@${domain}`;
}
