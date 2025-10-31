import { SHA256 } from "crypto-js";
import { Transaction } from "./transaction";

export class Block {
    timestamp: Date;
    nonce: number;
    data: Transaction[];
    hash: string;
    prevHash: string;

    constructor(txns: Transaction[], prevHash: string) {
        this.timestamp = new Date();
        this.data = txns;
        this.nonce = 0;
        this.hash = "";
        this.prevHash = prevHash;
    }

    genHash(): string {
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
}