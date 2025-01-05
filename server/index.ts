/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exchangeToken } from "./oauth";
import { createTransaction } from "./transactions";

dotenv.config();

const app = express();
const port = 9090;

app.use(cors());
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
