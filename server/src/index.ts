import { type ChainResponse, IType } from "../types/response";
import { Xenit } from "./chain";

const server = Bun.serve({
    port: 3000,

    // Upgrade HTTP → WebSocket
    fetch(req, server) {
        if (server.upgrade(req)) return;
        return new Response("WebSocket Server Running");
    },

    websocket: {
        open(ws) {
            
            const response: ChainResponse = {
                    type: IType.WELCOME,
                    message: "Thank you for choosing Xenit.. Happy Mining!!",
                    // data: Xenit.memPool(),
            }
            console.log("Miner connected");
            ws.send(JSON.stringify(response));
        },

        message(ws, message) {
            console.log("Received:", message.toString());
            ws.send("You sent: " + message);
        },

        close(ws) {
            console.log("Miner disconnected");
        }
    }
});

console.log("Bun WebSocket running at ws://localhost:3000");
