const accounts = new Map([['a1', { id: 'a1', name: 'Ada' }]]);

export function findAccount(id) {
  const account = accounts.get(id);
  return account ? { found: true, account } : { found: false };
}
