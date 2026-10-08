import { findAccount } from './accounts.mjs';

export function accountStatus(id) {
  const account = findAccount(id);
  return account ? 200 : 404;
}
