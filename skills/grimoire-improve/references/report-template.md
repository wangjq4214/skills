# Optional HTML report

Read only when HTML output is explicitly requested. Use the requested path, otherwise `.grimoire/improve-report.html`, within allowed write scope. Under orchestration, workers return data; only the designated writer publishes a report.

Include:
- scope, mode, source snapshot, inspected/total coverage, exclusions and unread/blocked regions;
- findings with location, evidence, impact, confidence, strategy/tradeoffs, and expected benefit;
- every finding's disposition, directly or through a full ledger link; presentation emphasis never limits work;
- for implementation, actual changes, validation commands/results, remaining work, and measured outcomes separated from proposals;
- target value/source and aspirational/required status, distinguishing missed aspirations from failed acceptance gates.

Use a small semantic HTML page with readable headings and code blocks. Omit empty sections; styling and diagrams are optional. Read [mermaid-conventions.md](./mermaid-conventions.md) only when a diagram helps.

Escape all repository text for its output context, including snippets, labels, and links. Never embed secrets, executable repository content, or untrusted scripts. Use a trusted Mermaid renderer only if diagrams are requested and the environment permits it; plain diagram source is an acceptable disclosed fallback.
