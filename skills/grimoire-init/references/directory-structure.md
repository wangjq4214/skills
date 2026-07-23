# Directory Structure

The canonical `.grimoire` layout:

```
.grimoire/
├── CONTEXT.md
├── adr/
├── spec/
└── ticket/
```

## CONTEXT.md

Unified project concept descriptions and terminology.

Records the shared vocabulary of the project domain. Every significant term, entity, or concept gets a definition here. Other grimoire files reference these definitions instead of re-explaining them.

When entries grow large, grimoire-record may split into domain files (`CONTEXT-[domain].md`), with CONTEXT.md becoming a domain index.

## adr/

Architecture Decision Records.

Each file records one significant architectural decision. Maintained by grimoire-record.

Naming: `NNNN-title-with-dashes.md` (zero-padded sequence number).

## spec/

Requirements specifications.

Each file describes a feature, capability, or constraint the project must satisfy. Specs define what must be built and why.

## ticket/

Implementation plans and cross-cutting aspects.

Each file bridges a spec to the implementation: which files change, in what order, what to verify. Tickets capture the plan, not the code.
