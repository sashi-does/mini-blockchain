import { WebSocket } from "ws";
import type { Transaction, Block } from "../types/chain";
import { IType, type ChainResponse } from "../types/response";
import { Blockchain } from "../../packages/src/blockchain"

const wss = new WebSocket('ws://localhost:3000');
let currentChain: Block[];
const blockchain = new Blockchain();

wss.on("open", () => {
    console.log("connected to Xenit");
})

wss.on("message", (msg) => {
    // get the response from the chain 
    const buff = msg.toString();
    let response: ChainResponse = JSON.parse(buff)

    if(response.type === IType.WELCOME) 
        currentChain = response.data as Block[]
    else if(response.type === IType.NEW_BLOCK) {
        const newBlock: Block = JSON.parse(JSON.stringify(response.data))
        

    } else {
        console.log(response)
        console.log("Incorrect")
    }
    
})