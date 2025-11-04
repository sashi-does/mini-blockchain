import { WebSocket } from "ws";
import { IType, type ChainResponse, type MinerResponse } from "../../packages/src/response"
import { Block } from "../../packages/src/block"
import { wallet } from "../../packages/src/wallet";
import { blockchain, getLatestTransactions } from "./helper";


const wss = new WebSocket('ws://localhost:3000');
let currentChain: Block[];


wss.on("open", () => {
    console.log("connected to Xenit");
})

wss.on("message", (msg) => {
    // get the response from the chain 
    const buff = msg.toString();
    let response: ChainResponse = JSON.parse(buff)

    if(response.type === IType.WELCOME) {
        currentChain = response.data as Block[];
        const getLatestBlockHash = blockchain.getLatestBlock().hash;
        // Five Transactions is MAX ( for a block )
        const txns = getLatestTransactions();
        const block = new Block(txns, getLatestBlockHash);
    }
        
    else if(response.type === IType.NEW_BLOCK) {
        let message: MinerResponse;
        try {
            const newBlock: Block = JSON.parse(JSON.stringify(response.data));
            const hash: string = blockchain.mineBlock(newBlock, wallet.getPublic("hex"));
            message = {
                type: IType.BLOCK_ACCEPTED,
                message: `Block is mined successfully: ${hash}`,
                hash
            };
            wss.send(JSON.stringify(message));

        } catch (Err) {
             message = {
                type: IType.BLOCK_DISCARDED,
                message: `Block is Rejected`
            };
            console.log("Block is not valid");
        }


    } else {
        console.log(response)
        console.log("Incorrect")
    }
    
})