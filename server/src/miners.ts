import type { ServerWebSocket } from "bun";

interface Miner {
    id: string;
    ws: ServerWebSocket;
    connectedAt: Date;
}

export const miners: Record<string, Miner> = {};

export default function genId() {
    return crypto.randomUUID();
}