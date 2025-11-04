import { Blockchain } from "../../packages/src/blockchain";
import type { Transaction } from "../../packages/src/transaction";

export const blockchain = new Blockchain();

export function getLatestTransactions(): Transaction[] {
    const pending = blockchain.pendingTransactions;
    if (pending.length <= 5) return pending;
    return pending.slice(0, 5);
}
