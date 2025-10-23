import { SHA256 } from "crypto-js";

class Block {
    index: number;
    data: string;
    timestamp: Date;
    prevHash: string;
    hash: string;
    nonce: number;

    constructor(
        index: number,
        data: string,
        timestamp: Date,
        prevHash = "",
        nonce: number
    ) {
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = this.computeHash();
        this.nonce = nonce;
    }

    computeHash(): string {
        return (SHA256(this.index + JSON.stringify(this.data).toString() + this.timestamp + this.nonce)).toString();
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce += 1;
            this.hash = this.computeHash();
        }
        console.log(`Mining Block ${this.index}.. \n ${this.hash} \n`);
    }

}

class Blockchain {
    blockchain: Array<Block>;
    constructor() {
        this.blockchain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, "this is genesis block", new Date(), "0", 0);
    }

    getLatestBlock(): Block | undefined {
        return this.blockchain[this.blockchain.length - 1];
    }

    addBlock(block: Block) {
        const latestBlock = this.getLatestBlock();
        if (latestBlock) {
            block.prevHash = latestBlock.hash;
        }
        block.mineBlock(2);
        this.blockchain.push(block);
    }

   
}

const chain = new Blockchain();

const b1 = new Block(chain.blockchain.length,"create a txn",new Date(), "", 0);
chain.addBlock(b1);

const b2 = new Block(chain.blockchain.length,"create a txn",new Date(), "", 0);
chain.addBlock(b2);

// console.log(JSON.stringify(chain.getLatestBlock(), null, 3));

console.log("All blocks: " + JSON.stringify(chain, null, 3));