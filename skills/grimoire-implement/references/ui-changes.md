# UI changes

Apply only to changes affecting UI appearance or interaction, including UI effects of shared code. In mixed tasks, apply these requirements to the UI portion only. Existing authorization and verification controls still apply.

## Resolve visual ambiguity

For highly ambiguous visual requests (such as "make it glass-like" or "more native"), establish before broad implementation:

- A reference component or concrete visual example, preferably from the existing application or design system.
- The mechanism behind the requested appearance: for example, translucent fill versus backdrop blur, or simulated material versus platform-native material. A screenshot alone does not establish the mechanism.
- The states that materially affect the result, such as focused/unfocused windows, light/dark themes, or content behind a translucent surface.

Use supplied references and repository evidence first. Ask when unresolved alternatives would materially change the result; otherwise state a bounded assumption and proceed. Do not make user confirmation a prerequisite for every UI change.

Reuse existing components and design tokens unless the request calls for changing them. Do not turn a local adjustment into an unsolicited redesign.

## Preview before expanding when useful

When an uncertain visual direction or rendering mechanism would be costly to propagate, first implement a representative component or small surface. Use the preview to resolve that uncertainty before expanding; straightforward, well-specified changes need no separate preview stage. Pause for the user only when a material choice remains unresolved or approval was requested.

A preview should exercise the uncertain mechanism and relevant states. Label mockups or substitutes that cannot reproduce the target rendering behavior.

When providing a file-based preview, give an openable absolute path, not just a relative repository path. For a running preview, give its URL and any startup/access requirements. Identify whether the artifact is an interactive preview or a static capture; do not present an ungenerated artifact as available.

## Separate verification evidence

Choose checks based on the changed behavior: relevant visual states, sizes, and keyboard/focus behavior for changed interactions. Do not require every UI state for every edit.

Distinguish automated rendering checks (such as browser screenshots or headless snapshots) from acceptance in the actual native application window. Automated checks establish only what their environment exercises; they do not prove native material composition, window activation behavior, or OS integration. For web-only changes, do not invent a native-window requirement.

Report which environment and states were checked. If target-window inspection or user visual acceptance is needed but unavailable, mark it pending rather than claiming it passed or treating an automated capture as equivalent.
