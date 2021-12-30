# Supabase Auth + Metamask

POC for integration of Metamask as a custom authentication provider for Supabase. Backend creates a new refresh token by writing directly into the _auth_ schema in Supabase database.

This POC can be used as a template for the implementation of any custom authentication providers which is not currently supported by Supabase.

## Getting started

- Install dependencies `yarn install`
- Create a new Supabase project
- Copy the env file `cp frontend/.env.example frontend/.env` and fill in the Supabase credentials (DATABASE_URL needs to specify schema=auth)
- Run development server `yarn dev`

## How it works

1. User clicks on the button to initialize the authentication process.
2. Metamask prompts the user to select an Etherium account which he wants to use for authentication.
3. Backend receives the address and creates a challenge (nonce) for the user to be signed by Metamask.
4. Metamask prompts the user to sign the challenge.
5. Backend receives the signature and verifies it.
6. Backend creates a new refresh token and writes it into the _auth_ schema in Supabase database.
7. User is signed in with a new refresh token into the application.

## Disclaimer

This is just a proof of concept. It is not intended to be used in production without any additional security improvements and code review.
