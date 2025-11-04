import { SHA256 } from "crypto-js";
import { EC } from "./wallet";

export class Transaction {
    fromAddress: null | string;
    toAddress: string;
    amount: number;
    hash: string;
    signature?: string;

    constructor(fromAddress: string, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.hash = this.getHash();
    }

    signTransaction(privateKey: string) {
        this.signature = EC.keyFromPrivate(privateKey).sign(this.hash).toDER("hex");
    }

    isValid(): Boolean {
        if(this.fromAddress == null) return true;
        if(this.toAddress == null) return false;
        if(!this.signature || this.signature.length == 0) return false;
        const pubKey = EC.keyFromPublic(this.fromAddress, "hex");
        console.log("((())++++)")
        const res = pubKey.verify(this.hash, this.signature);
        console.log(res)

        return pubKey.verify(this.hash, this.signature);
    }

    getHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
    }
}