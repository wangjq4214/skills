# Examples

## Behavior vs implementation

Bad — asserts internal state:
```typescript
it('should set the internal flag', () => {
  const processor = new PaymentProcessor();
  processor.process(validPayment);
  expect(processor._paymentProcessed).toBe(true); // internal field
});
```

Good — asserts behavior:
```typescript
it('should emit PaymentCompleted event when payment is valid', () => {
  const eventBus = { emit: jest.fn() };
  const processor = new PaymentProcessor(eventBus);

  processor.process(validPayment);

  expect(eventBus.emit).toHaveBeenCalledWith('PaymentCompleted', { amount: 100 });
});
```

## Isolation

Bad — reaches the database:
```typescript
it('should return user', async () => {
  const repo = new UserRepository(dbConnection); // real database
  const user = await repo.findById(1);
  expect(user.name).toBe('Alice');
});
```

Good — uses a test double:
```typescript
it('should return user when user exists', async () => {
  const rows = [{ id: 1, name: 'Alice' }];
  const db = { query: jest.fn().mockResolvedValue(rows) };
  const repo = new UserRepository(db);

  const user = await repo.findById(1);

  expect(user).toEqual({ id: 1, name: 'Alice' });
});
```

## AAA separation

Bad — mixed setup and assertion:
```typescript
it('should apply discount', () => {
  const cart = new Cart();
  cart.addItem({ price: 100 });
  expect(cart.total()).toBe(100);
  cart.applyDiscount(0.1);
  expect(cart.total()).toBe(90);
});
```

Good — clear AAA separation:
```typescript
it('should reduce total by 10% when 10% discount is applied', () => {
  // Arrange
  const cart = new Cart();
  cart.addItem({ price: 100 });

  // Act
  cart.applyDiscount(0.1);

  // Assert
  expect(cart.total()).toBe(90);
});
```

## Edge cases

Bad — only happy path:
```typescript
it('should divide numbers', () => {
  expect(divide(10, 2)).toBe(5);
});
```

Good — includes edge and error:
```typescript
it('should return quotient when divisor is non-zero', () => {
  expect(divide(10, 2)).toBe(5);
});

it('should throw when divisor is zero', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
});

it('should handle negative dividend', () => {
  expect(divide(-10, 2)).toBe(-5);
});

it('should return zero when dividend is zero', () => {
  expect(divide(0, 5)).toBe(0);
});
```
