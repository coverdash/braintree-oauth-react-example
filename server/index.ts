/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exchangeToken } from "./oauth";
import { createTransaction } from "./transactions";
import { createNonce } from "./grant/nonce";
import { createSubscription } from "./subscriptions";
import { createCustomer } from "./customers";

dotenv.config();

const app = express();
const port = process.env.PORT || 9090;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/oauth/token", async (req: any, res: any) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const accessTokensResponse = await exchangeToken(code);
    console.log("accessTokensResponse", accessTokensResponse);
    res.json(accessTokensResponse);
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

app.post("/api/customers", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const customerResult = await createCustomer(
    firstName,
    lastName,
    email,
    phone
  );
  console.log("customerResult", customerResult);
  res.json(customerResult);
});

app.post("/api/grant/nonce", async (req, res) => {
  const { accessToken, paymentMethodToken } = req.body;
  const nonceResult = await createNonce(accessToken, paymentMethodToken);
  console.log("nonceResult", nonceResult);
  res.json(nonceResult);
});

app.post("/api/subscriptions", async (req, res) => {
  const { paymentMethodNonce, planId, price, downPayment } = req.body;
  const subscriptionResult = await createSubscription(
    paymentMethodNonce,
    planId,
    downPayment,
    price
  );
  res.json(subscriptionResult);
});

app.post("/api/transactions", async (req, res) => {
  const { accessToken, amount, paymentMethodToken } = req.body;
  const transactionsResponse = await createTransaction(
    accessToken,
    amount,
    paymentMethodToken
  );
  console.log("transactionsResponse", transactionsResponse);
  res.json(transactionsResponse);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
