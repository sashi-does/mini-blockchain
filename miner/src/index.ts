import { WebSocket } from "ws";
import type { Transaction, Block } from "../types/chain";
import { IType, type ChainResponse } from "../types/response";

const wss = new WebSocket('ws://localhost:3000');

wss.on("open", () => {
    console.log("connected to Xenit");
})

wss.on("message", (msg) => {
    // get the response from the chain 
    const buff = msg.toString();
    let response: ChainResponse = JSON.parse(buff)
    console.log(response.type === IType.WELCOME)
    console.log(response.type === IType.NEW_BLOCK)


    if(response.type === IType.WELCOME) {
        let currentChain: Block[] = response.data as Block[]
        for(let b of currentChain) {
            console.log(b.timestamp)
        }
    } else if(response.type === IType.NEW_BLOCK) {
        console.log(JSON.stringify(response.data, null, 3))
    } else {
        console.log(response)
        console.log("Incorrect")
    }
    
})