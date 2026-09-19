# Didit KYC — scaffold (inactive)

Didit provides identity verification / KYC. Exotour will need it to vet
partner agencies before they get access to the future authenticated partner
space (booking calendar, white-label documents, payouts). **Nothing here is
wired into the public vitrine in this v1** — there is no sign-up flow yet.

## What's here

- `package.json` — placeholder for the Didit SDK (add it once Didit
  publishes the package you intend to use, e.g. `@didit-protocol/sdk` or
  their REST client — check their current docs before pinning a version).
- This README, documenting how to switch it on.

## Activating it later

1. Add the Didit dependency to this package once chosen, and reference it
   from `functions` (server-side verification calls should never happen
   from the browser).
2. Add environment variables:
   - `VITE_DIDIT_CLIENT_ID` in `apps/web/.env` (already scaffolded in
     `.env.example`) for the client-side verification widget/redirect.
   - `DIDIT_API_KEY` / `DIDIT_WEBHOOK_SECRET` as Cloud Functions secrets.
3. Add a `startPartnerVerification` callable function and a webhook handler
   that updates a partner's verification status in Firestore
   (`partners/{partnerId}.kycStatus`).
4. Gate the future authenticated partner space (Firebase Auth) behind a
   verified `kycStatus` before granting booking/calendar access.

Until then, keep this folder as-is.
