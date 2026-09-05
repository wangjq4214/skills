# Test Patterns

## Arrange → Act → Assert

AAA is a useful default for scenario tests. Keep phases visible when doing so improves comprehension. Table-driven, property-based, snapshot, state-machine, and concurrency tests may use a different natural structure.

```typescript
it('returns the user for an existing id', async () => {
  const repo = stubUserRepo({ id: 1, name: 'Alice' });
  const service = new UserService(repo);

  const result = await service.getUser(1);

  expect(result).toEqual({ id: 1, name: 'Alice' });
});
```

Extract setup helpers when they reveal intent, not because setup crosses an arbitrary line count.

## Naming

Follow project conventions. Prefer names that identify the scenario, property, or expected contract so failure output is diagnostic.

## Test-double decision

| Boundary | Prefer |
| --- | --- |
| Important interaction protocol | Mock |
| Controlled return or failure | Stub |
| Stateful reusable behavior | Fake |
| Fast deterministic collaborator | Real implementation |

Avoid interaction assertions unless the interaction itself is part of the contract.

## Scenario scope

A test should have one coherent reason to fail. It may assert multiple related outcomes of that scenario. Split only when failures represent independent behaviors or require substantially different setup.

## Testing the SUT

Prefer the real SUT. Partial mocks can be useful for legacy characterization but signal coupling; document the compromise and avoid treating it as the default design.
