# Label normalization

R1. `normalizeLabel(text)` trims leading/trailing whitespace.
R2. It lowercases the label.
R3. It throws RangeError for an empty or whitespace-only label.

Input is always a string; other types are outside scope.
