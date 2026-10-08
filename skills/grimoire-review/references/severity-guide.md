# Classification edge cases

Use the main skill's classifications; confidence is separate from impact.

| Situation | Classification |
| --- | --- |
| Reproduced regression or demonstrated contract/security/data failure | blocking |
| Suspected race depends on unknown production scheduling | needs-verification; state the confirming/refuting evidence |
| All relevant accesses use the same lock and the alleged harmful interleaving is excluded | No race finding; refuted concerns are not needs-verification |
| Changed function satisfies its new contract, but an unchanged caller demonstrably relies on the old one | blocking; cite both sides of the broken contract |
| Tool fails before running relevant checks | unavailable evidence, not proof of a product defect |
| Valid implementation could have lower maintenance cost | suggestion with concrete benefit |
| Dependency cycle has no established material consequence | investigate, not an automatic blocker |
| Specific boundary prevents invalid states or isolates real complexity | praise if useful, not obligatory |

High confidence needs direct source/contract proof or reproduction. Medium confidence states its assumptions. Low-confidence plausible harm normally needs verification, not blocking. Drop preferences without concrete impact.
