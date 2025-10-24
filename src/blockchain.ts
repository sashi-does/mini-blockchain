import { SHA256 } from "crypto-js";

export class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    signature: string;
    constructor(fromAddress: string | null, toAddress: string, amount: number) {
        this.fromAddress = fromAddress as string;
        this.toAddress = toAddress;
        this.amount = amount;
        this.signature = "";
    }

    createHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
}

export class Block {   
    timestamp: Date;
    transactions: Transaction[];
    prevHash: string;
    hash: string;
    nonce: number;
    
    constructor(timestamp: Date, transactions: Transaction[], prevHash=Array(26).join("0")) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = "";
        this.nonce = 0;
    }

    computeHash(): string {
        return SHA256(this.timestamp + JSON.stringify(this.transactions).toString() + this.nonce).toString();
    }
}

export class Blockchain {
    chain: Array<Block>;
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 200;
    }

    createGenesisBlock() {
        const block = new Block(new Date(), []);
        block.hash = block.computeHash();
        return block
    }

    createTransaction(txn: Transaction) {
        this.pendingTransactions.push(txn);
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }

    mineBlock(block: Block) {
        while(block.hash.substring(0, this.difficulty) != Array(this.difficulty+1).join("0")) {
            block.nonce += 1;
            block.hash = block.computeHash();
        }
        console.log("Block " + this.chain.length + " mined: " + block.hash);
    }

    minePendingTransactions(miningRewardAddress: string) {
        const block = new Block(new Date(), this.pendingTransactions);
        this.mineBlock(block);
        console.log("Block successfully mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];

    }

    chainState(): Boolean {
        for(let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let prevBlock = this.chain[i-1];
            if(currentBlock?.prevHash != prevBlock?.hash) return false;
            if(currentBlock?.computeHash() != currentBlock?.hash) return false;
        }
        return true;
    }

    getBalance(address: string) {
        let balance = 0;
        for(const block of this.chain) {
            for(const txn of block.transactions) {
                if(txn.fromAddress == address) balance -= txn.amount;
                if(txn.toAddress == address) balance += txn.amount;
            }
        }
        console.log("Balance of account: " + address + " $" + balance);
    }

}