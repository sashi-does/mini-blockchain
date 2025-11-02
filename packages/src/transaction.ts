import { SHA256 } from "crypto-js";

export class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    constructor(fromAddress: string, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    getHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
    }
}