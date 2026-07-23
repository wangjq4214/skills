# Test Patterns

## AAA (Arrange → Act → Assert)

Every test body follows this three-part structure:

```typescript
it('should return user when user exists', () => {
  // Arrange
  const mockRepo = { findById: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' }) };
  const service = new UserService(mockRepo);

  // Act
  const result = await service.getUser(1);

  // Assert
  expect(result).toEqual({ id: 1, name: 'Alice' });
});
```

Keep blocks visually separated. If Arrange is more than ~5 lines, extract a factory function.

## Test naming

Pattern: `should_[behavior]_when_[condition]`

Good:
- `should_return_user_when_id_exists`
- `should_throw_not_found_when_id_does_not_exist`
- `should_return_empty_list_when_no_results`

Bad:
- `testGetUser`
- `getUser works`
- `getUser test 1`

The name is read in the failure report. Make it tell what broke.

## Test double decision

| Type | Use when                                    |
| ---- | ------------------------------------------- |
| Mock | You need to assert a specific call was made |
| Stub | You only need controlled return values      |
| Fake | A simple in-memory implementation is easier |

Prefer Stub over Mock when possible — fewer assertions on implementation details.

Prefer Fake over Mock when the dependency behavior is complex but easy to simulate (e.g., in-memory repository).

## One behavior per test

Each test exercises exactly one behavior. If a test needs "and" in its name, split it:

Bad: `should_create_user_and_send_email_and_log_event`
Good: three separate tests.

## Avoiding test doubles for the SUT itself

Never mock or stub the SUT. Test the real SUT with doubled dependencies.

Partial mocks on the SUT (e.g., mocking one method to test another) are a design smell — the class likely has too many responsibilities.
