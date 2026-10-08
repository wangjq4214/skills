function createMutex() {
  let tail = Promise.resolve();
  return async function withLock(action) {
    const previous = tail;
    let release;
    tail = new Promise(resolve => { release = resolve; });
    await previous;
    try {
      return await action();
    } finally {
      release();
    }
  };
}

export function createCounter() {
  const withLock = createMutex();
  let count = 0;
  return {
    increment() {
      return withLock(async () => {
        const previous = count;
        await Promise.resolve();
        count = previous + 1;
      });
    },
    read() {
      return withLock(() => count);
    },
  };
}
