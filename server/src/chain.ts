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

    getSignature() {
        return SHA256(this.fromAddress + this.toAddress + this.amount)
    }
}

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
        this.hash = "0000000000";
        this.prevHash = prevHash;
    }

    genHash(): string {
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
}


export class Blockchain {
    pendingTransactions: Transaction[];
    chain: Block[];
    difficulty: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 3;
    }

    getAllBlocks() {
        return this.chain;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1] as Block;
    }

    createGenesisBlock(): Block {
        return new Block([], "");
    }

    memPool(): Transaction[] {
        return this.pendingTransactions;
    }

    toJSON() {
        return {
            chain: this.chain.map((block: Block) => ({
                index: block.nonce,
                timestamp: block.timestamp,
                hash: block.hash,
                prevHash: block.prevHash,
                nonce: block.nonce.toString(),        // BigInt → string
                difficulty: Number(this.difficulty), // BigInt → number
                transactions: block.data.map((tx: Transaction) => ({
                    from: tx.fromAddress,
                    to: tx.toAddress,
                    amount: Number(tx.amount),        // BigInt → number
                    signature: tx.getSignature()
                }))
            })),

            mempool: this.memPool().map((tx: Transaction) => ({
                from: tx.fromAddress,
                to: tx.toAddress,
                amount: Number(tx.amount),
                signature: tx.getSignature()
            }))
        };
    }


    addBlock(block: Block) {
        if (this.getLatestBlock().hash != block.hash) return;
        if (!this.isChainValid()) return;
        this.chain.push(block);
    }

    mineBlock(block: Block) {
        while (block.hash.substring(0, this.difficulty + 1) != Array(3).join("0")) {
            block.nonce += 1;
            block.hash = block.genHash();
        }
        this.addBlock(block);
        return block.hash;
    }

    isChainValid(): Boolean {
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[i]?.prevHash != this.chain[i - 1]?.hash) return false;
            if (this.chain[i]?.genHash() != this.chain[i]?.hash) return false;
        }
        return true;
    }
}


export const Xenit = new Blockchain();
Xenit.createGenesisBlock();


const txn = new Transaction("0x1235", "0x456", 9);
const recentBlock = Xenit.getLatestBlock();

const block = new Block([txn], recentBlock.hash);

Xenit.mineBlock(block);


