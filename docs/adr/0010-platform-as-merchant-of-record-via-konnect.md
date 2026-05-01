# Platform is Merchant of Record for online payments; Konnect held by the platform

When a Client pays online, the funds land in Pamper Me's Konnect merchant account; the platform settles to the Business (gross minus commission) on a payout schedule. The Client sees Pamper Me on their statement. We considered the facilitator model (each Business connects their own Konnect account) but rejected it because Konnect KYC at Business onboarding would collapse supply acquisition in v1, which is the marketplace's hardest problem. The cost we accept is regulatory: Pamper Me must be registered appropriately with the BCT as a marketplace handling third-party funds, and we own client-money accounting and TVA collection on the platform side. If Konnect's marketplace / split-payment API supports a sub-merchant flow today, we may evolve toward that without changing the Business-facing UX; the data model already places the payout account on the Business, leaving room for it.

## Consequences

- Pamper Me must be incorporated as a Tunisian entity and registered with the BCT under the appropriate intermediary regime before launch.
- Client-money accounting (segregated balances, payout reconciliation, refund flow) is a v1 platform concern, not a deferred one.
- TVA on the platform's commission, and on the gross transaction in some interpretations, sits with Pamper Me — needs concrete legal sign-off before launch.
