import { Block } from "./block";
import { IType } from "./response";
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
        if(block.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) return false;
        if(this.getLatestBlock().hash != block.prevHash) return false;
        if(!this.isTxnsValid(block)) return false;
        return true;
    }

    isTxnsValid(block: Block): IType {
        const txns = block.txns;
        for(let txn of block.txns) {
            if(!txn.isValid()) return IType.INVALID_TXNS;
        }
        // logic to verify all the transactions
        return IType.VALID_TXNS;
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

    private hasValidTxns(block: Block): Boolean {
        for(let txns of block.txns) {
            if(!txns.isValid()) return false;
        }
        return true;
    }

    mineBlock(block: Block, minerAddress: string): IType | string {
        block.hash = block.genHash();
        if(!minerAddress) return IType.INVALID_MINER_ADDRESS;
        if(!this.hasValidTxns(block)) return IType.INVALID_TXNS;

        while (block.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) {
            block.nonce += 1;
            block.hash = block.genHash();
        }

        this.addBlock(block);
        this.pendingTransactions.splice(0, block.txns.length);
        this.pendingTransactions.push(new Transaction("", minerAddress, 100));
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

