# Stripe / Stripe Connect — scaffold (inactive)

This folder exists so the payment integration has a clear home once Exotour's
partner space needs to bill agencies or split payouts (Stripe Connect) —
**no payment flow is active in this v1**. The public vitrine never displays
prices or collects card details.

## What's here

- `package.json` — pins `stripe` (server SDK) and `@stripe/stripe-js`
  (client SDK) so the dependency tree is ready when this is activated.
- This README, documenting how to switch it on.

## Activating it later

1. Install the dependencies into the workspaces that need them:
   - `apps/web` for `@stripe/stripe-js` (Elements / Checkout redirect).
   - `functions` for `stripe` (creating PaymentIntents / Connect accounts
     server-side, verifying webhooks).
2. Add the Stripe keys as environment variables — never commit them:
   - `VITE_STRIPE_PUBLISHABLE_KEY` in `apps/web/.env` (already scaffolded in
     `.env.example`).
   - `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` as Cloud Functions
     secrets: `firebase functions:secrets:set STRIPE_SECRET_KEY`.
3. Add a `createCheckoutSession` / `createConnectAccount` callable function
   in `functions/src/`, mirroring the pattern used by `submitLead`.
4. Add a Stripe webhook HTTPS function to reconcile payment/payout state
   into Firestore.
5. Build the partner-facing billing UI in `apps/web` once the authenticated
   partner space (see root README "Évolutions futures") exists.

Until then, keep this folder as-is: dependencies installed, nothing wired
into the public site.
