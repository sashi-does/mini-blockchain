import { consensus, processConsesnus } from "./consensus";
import { Event } from "../../packages/src/response";
import { type ChainResponse, IType } from "../../packages/src/response";
import type { Block } from "../../packages/src/block";
import { Xenit } from "./socket";
import genId, { miners } from "./miners";

Bun.serve({
    port: 3000,

    fetch(req, server) {
        if (server.upgrade(req)) return;
        return new Response("WebSocket Server Running");
    },

    // Impl of pub/sub
    websocket: {
        open(ws) {
            // Add Miner to the Record
            const id = genId();
            (ws as any).id = id;
            miners[`MINER_${id}`] = {
                id,
                ws,
                connectedAt: new Date(),
            };
            const response: ChainResponse = {
                type: IType.WELCOME,
                message: "Thank you for choosing Xenit.. Happy Mining!",
                data: Xenit.chain
            }
            console.log("Miner connected");
            // Subscribe to event
            ws.subscribe(Event.XENIT_EVENT_0_0_1)
            ws.send(JSON.stringify(response, null, 3) + "\n");
        },

        message(ws, message) {
            console.log("Received:", message.toString());
            ws.send("Data sent succesfully!");
            const response: ChainResponse = JSON.parse(message.toString());
            const block = response.data as Block

            // New Block Proposal
            if (response.type === IType.NEW_BLOCK) {
                consensus[block.hash] = { accepted: 0, rejected: 0 };
                // Broadcast the new block to all miners to verify the block
                ws.publish(Event.XENIT_EVENT_0_0_1, message);
            }
            // Block status by the Miner
            else if (response.type == IType.BLOCK_ACCEPTED || response.type == IType.BLOCK_REJECTED) {

                const key = block.hash;
                if(!consensus[key]) 
                    consensus[key] = { accepted: 0, rejected: 0 };
                const entry = consensus[key];
                if (response.type === IType.BLOCK_ACCEPTED) {
                    entry.accepted++;
                    processConsesnus(block);
                }
                else {
                    entry.rejected++;
                    processConsesnus(block);
                }
                

                // Broadcast to all miners
                ws.publish(Event.XENIT_EVENT_0_0_1, "");
            }

        },

        close(ws) {
            const id = (ws as any).id;
            if(id && miners[id]) 
                delete miners[id];
            
            console.log("Miner disconnected");
        }
    }
});

console.log("Blockchain running at 3000...");
