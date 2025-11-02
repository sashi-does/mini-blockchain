import type { ServerWebSocket } from "bun";
import { Blockchain } from "../../packages/src/blockchain";

export let socket: ServerWebSocket;
export const Xenit = new Blockchain();

export function setSocket(ws: ServerWebSocket) {
    socket = ws;
}