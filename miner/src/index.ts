import { WebSocket } from "ws";

const wss = new WebSocket('ws://localhost:5000');

wss.on("open", () => {
    console.log("connected to Xenit");
})

wss.on("message", (msg) => {
    const buff = msg.toString();
    console.log(buff);
})