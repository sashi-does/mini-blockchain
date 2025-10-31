import { type ChainResponse, IType } from "../types/response";
import { chain } from "./chain";

Bun.serve({
    port: 3000,

    fetch(req, server) {
        if (server.upgrade(req)) return;
        return new Response("WebSocket Server Running");
    },

    websocket: {
        open(ws) {
            ws.subscribe("New Block")
            const response: ChainResponse = {
                type: IType.WELCOME,
                message: "Thank you for choosing Xenit.. Happy Mining!",
                data: chain
            }
            console.log("Miner connected");
            ws.send(JSON.stringify(response, null, 3) + "\n");
        },

        message(ws, message) {
            console.log("Received:", message.toString());
            ws.send("Data sent succesfully!");

            ws.publish("New Block", message);
        },

        close(ws) {
            console.log("Miner disconnected");
        }
    }
});

console.log("Blockchain running at 3000...");
