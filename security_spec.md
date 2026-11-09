# Security Specification & Threat Model: Nigeria Decides 2027

## Data Invariants
1. A citizen cannot cast a vote without a valid payment reference and status 'completed'.
2. A citizen with the same Full Name AND Phone/Email cannot submit multiple votes. Uniqueness is enforced via deterministic document locks in `/voters/{voterKey}`.
3. Minimum vote backing must be at least ₦1,000.
4. Admins have read and write privileges over platform settings, vote status, and audit ledgers.
5. Bootstrapped admin is `jhulk738@gmail.com`.

## The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Vote Creation without lock**: Trying to create a vote directly bypassing validation checks.
2. **Duplicate Vote Injection**: Attempting to overwrite an existing voter key in `/voters/{voterKey}`.
3. **Ghost Field Poisoning**: Adding `isSuperAdmin: true` or `bypassed: true` into a Vote document.
4. **Sub-threshold Contribution**: Submitting a vote with `amountNgn: 50` (below minimum ₦1,000).
5. **Negative Value Attack**: Submitting `amountNgn: -50000`.
6. **Candidate Spoofing**: Submitting an arbitrary 10,000-character candidate name.
7. **Client Overwrite of Admin Settings**: Non-admin attempting to modify `/platform_settings/general`.
8. **Admin Privilege Escalation**: Non-admin attempting to write to `/admins/{uid}`.
9. **Tampering with existing vote**: Non-admin attempting to update someone else's vote to change the candidate.
10. **State Corruption**: Injecting an invalid Nigerian state name string with 2MB junk data.
11. **Client Fake Timestamp**: Injecting a client future timestamp 2 years in advance.
12. **PII Harvesting via list**: Non-admin attempting to scrape all full contacts without proper auth.
