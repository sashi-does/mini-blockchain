import { Block } from "./block";
import { Transaction } from "./transaction";

export class Blockchain {
    pendingTransactions: Transaction[];
    chain: Block[];
    difficulty: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 2;
    }

    getAllBlocks() {
        return this.chain;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1] as Block;
    }

    isValidBlock(block: Block): Boolean {
        if(block.hash != block.genHash()) return false;
        if(this.getLatestBlock().hash != block.prevHash) return false;
        if(!this.isTxnsValid(block)) return false;
        return true;
    }

    isTxnsValid(block: Block): Boolean {
        const txns = block.txns;
        // logic to verify all the transactions
        return true;
    }

    createGenesisBlock(): Block {
        const rootBlock = new Block([], "");
        rootBlock.hash = "000000000000000";
        return rootBlock
    }

    memPool(): Transaction[] {
        return this.pendingTransactions;
    }

    private addBlock(block: Block) {
        if (block.prevHash !== this.getLatestBlock().hash) return;
        if (!this.isChainValid()) return;
        this.chain.push(block);
    }


    mineBlock(block: Block) {
        block.hash = block.genHash();
        while (block.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) {
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


// export const Xenit = new Blockchain();
// export const chain = Xenit.chain;

// const t = [new Transaction("frm", "to", 3)];

// const b = new Block(t,"jvjlhv" );
// const latestBlock = Xenit.getLatestBlock();
// b.prevHash = latestBlock.hash
// Xenit.mineBlock(b);

// const b2 = new Block(t, "" );
// const latestBlock2 = Xenit.getLatestBlock();
// b2.prevHash = latestBlock2.hash
// Xenit.mineBlock(b2);


// console.log(JSON.stringify(Xenit.getAllBlocks(), null, 3));



// console.log(Xenit.isChainValid())
// const tamper = [new Transaction("frm", "to", 3)];
// const bb = Xenit.chain[1];
// console.log(Xenit.isChainValid())
