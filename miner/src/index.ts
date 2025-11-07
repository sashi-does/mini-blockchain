import { WebSocket } from "ws";
import { IType, type ChainResponse, type MinerResponse } from "../../packages/src/response"
import { Block } from "../../packages/src/block"
import { blockchain, getLatestTransactions } from "./helper";


const wss = new WebSocket('ws://localhost:3000');
let currentChain: Block[];


wss.on("open", () => {
    console.log("connected to Xenit");
})

wss.on("message", (msg) => {
    // get the response from the chain 
    let response: ChainResponse = JSON.parse(msg.toString("utf-8"));
    console.log(response)
    
    // let response: ChainResponse = JSON.parse(buff)

    console.log(response.type)
    if(response.type === IType.WELCOME) {
        currentChain = response.data as Block[];
        const getLatestBlockHash = blockchain.getLatestBlock().hash;
        // Five Transactions is MAX ( for a block )
        const txns = getLatestTransactions();

        // Start mining the block
        const block = new Block(txns, getLatestBlockHash);
        const miningResult = blockchain.mineBlock(block, "miner_address");
        
        if(miningResult == IType.INVALID_MINER_ADDRESS) {
            console.log("Invalid Miner Address")
            return;
        }
        if(miningResult == IType.INVALID_TXNS) {
            console.log("Invalid Transactions");
            return;
        }
        const message = {
            type: IType.NEW_BLOCK,
            message: `New Block: ${block.hash}`,
            data: block
        }
        console.log(JSON.stringify(block, null, 3) + " *&*&*&*")
        wss.send(JSON.stringify(message));

    }
        
    else if(response.type === IType.NEW_BLOCK) {
        let message: MinerResponse;
        try {
            message = {
                type: IType.BLOCK_ACCEPTED,
                message: `Block is mined successfully: ${response.data}`,
                data: response.data
            };
            wss.send(JSON.stringify(message));

        } catch (Err) {
             message = {
                type: IType.BLOCK_DISCARDED,
                message: `Block is Rejected`
            };
            console.log("Block is not valid");
        }


    } else if(response.type == IType.BLOCK_FINALIZED) {
        const newBlock: Block = response.data as Block
        console.log(newBlock)
        currentChain.push(newBlock)
        console.log(JSON.stringify(currentChain, null, 3))
    }
    else {
        console.log(response)
        console.log("Incorrect ra reeee")
    }
    
})