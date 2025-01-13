# Braintree OAuth Integration Example

This React TypeScript project demonstrates a Braintree OAuth integration flow between two merchants. It showcases how Merchant A can obtain authorization from Merchant B to perform actions on their behalf using Braintree's OAuth and transaction APIs.

Want to experience it firsthand in your own environment? Simply click the button below to deploy it in a matter of clicks:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcoverdash%2Fbraintree-oauth-react-example&env=VITE_BRAINTREE_ENVIRONMENT,VITE_BRAINTREE_MERCHANT_ID,VITE_BRAINTREE_OAUTH_CLIENT_ID,BRAINTREE_ENVIRONMENT,BRAINTREE_MERCHANT_ID,BRAINTREE_OAUTH_CLIENT_ID,BRAINTREE_OAUTH_CLIENT_SECRET)

To authenticate the OAuth permissions request, a second Braintree account will be necessary for approval.

## Overview

In this example, Merchant A provides this application to Merchant B, allowing them to:

- Grant OAuth permissions to Merchant A
- Allow access to customer payment methods
- Enable facilitated transactions

The integration uses two main Braintree APIs:

- [Access Token API](https://developer.paypal.com/braintree/docs/guides/extend/oauth/access-tokens/node#creating-an-access-token) - For OAuth authentication
- [Transaction API](https://developer.paypal.com/braintree/docs/guides/extend/oauth/shared-vault/node) - For creating Shared Vault Transactions

## Features

- OAuth connection flow
- Token management and storage
- Shared vault transaction processing
- Real-time transaction status updates
- Error handling and user feedback

## Prerequisites

Before running this application, you'll need:

- Node.js (v16 or higher)
- Yarn package manager
- Braintree sandbox account
- Environment variables (see `.env.example`)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Client Accessible Environment Variables
VITE_BRAINTREE_ENVIRONMENT=sandbox
VITE_BRAINTREE_MERCHANT_ID=MERCHANT_A_MERCHANT_ID
VITE_BRAINTREE_OAUTH_CLIENT_ID=MERCHANT_A_OAUTH_CLIENT_ID

# Server Environment Variables (Merchant A)
BRAINTREE_ENVIRONMENT=sandbox
BRAINTREE_MERCHANT_ID=MERCHANT_A_MERCHANT_ID
BRAINTREE_OAUTH_CLIENT_ID=MERCHANT_A_OAUTH_CLIENT_ID
BRAINTREE_OAUTH_CLIENT_SECRET=MERCHANT_A_OAUTH_CLIENT_SECRET

# Server Environment Variables (Merchant B)
BRAINTREE_PUBLIC_KEY=MERCHANT_B_PUBLIC_KEY
BRAINTREE_PRIVATE_KEY=MERCHANT_B_PRIVATE_KEY
```

## Running the Application

```bash
# Terminal 1 - Frontend
yarn dev

# Terminal 2 - Backend
yarn server
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:9090

## How It Works

1. Merchant B accesses the application and initiates the OAuth connection
2. They are redirected to Braintree's OAuth consent page
3. Upon authorization, Braintree redirects back with an authorization code
4. The application exchanges this code for access/refresh tokens
5. Merchant A can now process transactions on Merchant B's behalf

## API Endpoints

- `POST /api/oauth/token` - Exchange authorization code for tokens
- `POST /api/transactions` - Create a shared vault transaction

## Security Considerations

- All sensitive credentials are stored in environment variables
- OAuth tokens are securely managed
- CORS is properly configured
- Input validation is implemented

> [!IMPORTANT]  
> This project is a demonstration and should not be used in production as-is. Ensure that all sensitive information, such as OAuth tokens and API keys, are stored securely and not in local storage. Follow best practices for security and data protection.

## Token Storage

For demonstration purposes, the returned access token and refresh token are stored in local storage to demo the create transaction API. However, this would not happen in the real use case of this project. In reality, once Merchant B completes the OAuth approval process, Merchant A's environment of this app should store the access token and refresh token securely so that they can use it to perform actions on Merchant B's behalf as mentioned above. It is highly recommended to store these tokens securely in secure HTTP-only cookies or a secure storage service to prevent potential security vulnerabilities.
