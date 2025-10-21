import { SHA256 } from "crypto-js";

// define the block
class Block {
    index: number;
    timestamp: Date;
    data: string | object;
    prevHash: string;
    hash: string;

    constructor(index: number, timestamp: Date, data: string | object, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain {
    chain: Array<Block>;
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(): Block {
        return new Block(0, new Date(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.prevHash = (this.getLatestBlock()?.hash) as string;
        newBlock.hash = newBlock.calculateHash();
        // forget about consensus
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for(let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];

            const prevBlock = this.chain[i - 1];

            if(currBlock?.hash != currBlock?.calculateHash()) return false;
            if(currBlock?.prevHash != prevBlock?.hash) return false;
        }
        return true;
    }

}

let sashiChain = new Blockchain();
sashiChain.addBlock(new Block(1, new Date(), { amount: 4 }));

console.log(JSON.stringify(sashiChain, null, 4));
console.log("Is blockchain valid: " + sashiChain.isChainValid());

// can't be tampered with some data
(sashiChain.chain[1] as Block).data = { amount: 100 };

console.log("Is blockchain valid: " + sashiChain.isChainValid());
