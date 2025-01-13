import fetch from "node-fetch";
import xml2js from "xml2js";
import type { OAuthTokenResponse } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseXML = (xml: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export async function exchangeToken(
  authorizationCode: string
): Promise<OAuthTokenResponse> {
  const environment = process.env.BRAINTREE_ENVIRONMENT || "sandbox";
  const clientId = process.env.BRAINTREE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.BRAINTREE_OAUTH_CLIENT_SECRET;

  console.log("environment", environment);
  console.log("clientId", clientId);
  console.log("clientSecret", clientSecret);

  if (!clientId || !clientSecret) {
    throw new Error("Missing Braintree credentials");
  }

  const response = await fetch(
    `https://${environment}.braintreegateway.com/oauth/access_tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
      }),
    }
  );

  const xmlText = await response.text();
  // console.log("xmlText", xmlText);
  const xmlData = await parseXML(xmlText);
  // Extract and format token data
  const formattedData = {
    accessToken: xmlData?.credentials["access-token"][0] ?? "",
    refreshToken: xmlData?.credentials["refresh-token"][0] ?? "",
    tokenType: xmlData?.credentials["token-type"][0] ?? "",
    expiresAt: xmlData?.credentials["expires-at"][0] ?? "",
    scope: xmlData?.credentials.scope[0] ?? "",
  };

  return formattedData;
}
