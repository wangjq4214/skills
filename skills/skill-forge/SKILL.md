---
name: skill-forge
description: Use when asked to turn a workflow into an agent skill, review or simplify an existing SKILL.md, or fix skill descriptions that miss intended tasks or trigger on unrelated ones.
disable-model-invocation: true
---

Write the smallest skill that reliably supplies what the agent would otherwise
miss: task-specific knowledge, consequential decisions, necessary constraints,
and non-obvious procedures.

Assume the agent already knows general task-solving practices.

## Shape the skill

Identify when the skill applies and what it must change about the agent's
behavior. When revising, preserve required behavior, not the existing outline.

Start with direct instructions in one SKILL.md. Choose structure to fit the
task; a skill may be a few rules, a decision guide, or an ordered procedure.
Use ordered steps only when sequence matters.

Include completion criteria where success is ambiguous or premature completion
is a meaningful risk. Do not require a done condition for every step.

Treat every skill's description as a context pointer: it tells the agent when
to load the skill, before the body is available. Name concrete user requests,
task situations, or observable symptoms, not just the skill's capabilities.
Put the strongest trigger first; add distinct task branches, not synonym lists.
For example, prefer "Use when tests fail intermittently or a previously fast
operation slows down" over "Diagnose software problems."

Keep selection cues in the description and procedures in the body. Add a brief
boundary only where a neighboring skill is likely to be confused with this one.
Choose automatic or explicit invocation according to the target host and
intended usage; clearer descriptions do not override invocation restrictions.

## Keep only what earns its place

For each instruction, ask: what concrete mistake or knowledge gap would its
removal expose? Delete generic advice, obvious task decomposition, repeated
requirements, and explanations that add no useful distinction.

Prefer familiar language. Add examples when they resolve ambiguity more
efficiently than prose; introduce terminology only when it reduces explanation.

Delete unnecessary material rather than relocating it. Use references for
necessary material needed only in specific situations, and state when to read
each reference. Keep essential constraints in the main file.

Split skills when they have independently useful triggers or responsibilities,
not merely to shorten a file.

## Check the result

Check selection using only the description: intended requests, paraphrases,
and nearby tasks that should not select this skill. Fix missing or overbroad
triggers in the pointer rather than compensating with more body instructions.

Check representative tasks and important edge cases against the required
behavior. Use execution evidence when available; label scenario reasoning as
unverified rather than claiming tested reliability.

If a shorter version preserves the required behavior, prefer it. Add instructions
to address a concrete failure or a credible risk, not to fill out a template.

Keep the delivery brief: summarize material changes and verification limits.
