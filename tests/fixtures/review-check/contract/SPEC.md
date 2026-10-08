# Account lookup migration

R1. `findAccount(id)` now returns `{ found: true, account }` or `{ found: false }` instead of an account or null.
R2. Preserve `accountStatus(id)`: return 200 for a known account and 404 for an unknown account.
