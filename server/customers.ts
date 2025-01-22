import { BraintreeGateway, Environment } from "braintree";
import type { TransactionResult } from "../src/lib/types";

export async function createCustomer(
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): Promise<TransactionResult> {
  const environment = Environment.Sandbox; // Adjust this to match your environment
  const merchantId = process.env.MERCHANT_A_MERCHANT_ID || "";
  const publicKey = process.env.MERCHANT_A_PUBLIC_KEY || "";
  const privateKey = process.env.MERCHANT_A_PRIVATE_KEY || "";

  try {
    const gateway = new BraintreeGateway({
      environment,
      merchantId,
      publicKey,
      privateKey,
    });

    const customerResult = await gateway.customer.create({
      firstName,
      lastName,
      email,
      phone,
    });

    console.log("createCustomer result", customerResult);

    return customerResult;
  } catch (error) {
    console.error("Create Customer error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create customer",
    };
  }
}
