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
    console.log("&&&&&&&&&")
    console.log(buff)
    // console.log(buff);
    let response: ChainResponse = JSON.parse(buff)
    if(response.type === IType.NEW_BLOCK) {
        let currentChain: Block[] = response.data as Block[]
        for(let b of currentChain) {
            console.log(b.timestamp)
        }
    } else if(response.type === IType.WELCOME) {
        console.log(JSON.stringify(response.data, null, 3))
    }
    
})