import type { Block } from "../../packages/src/block";
import { Event } from "../../packages/src/response";
import { IType } from "../../packages/src/response";
import { socket, Xenit } from "./socket";

export const consensus: Record<string, { accepted: number, rejected: number }> = {}

export function processConsesnus(block: Block) {
    const entry = consensus[block.hash];
    if(!entry) return;
    const totalVotes = entry.accepted + entry.rejected;
    const threshold = Math.floor(totalVotes * 0.6);

    if (totalVotes < threshold) return;
    if (entry.accepted > totalVotes / 2) {
        finaliseBlock(block);
        return;
    }
    if(entry.rejected > totalVotes / 2 ) {
        discardBlock(block);
        return;
    }
}

function finaliseBlock(block: Block) {
    Xenit.chain.push(block);
    const message = {
        type: IType.BLOCK_FINALIZED,
        message: `New Block Added: ${block.hash}`,
        data: Xenit.chain
    }
    socket.publish(Event.XENIT_EVENT_0_0_1, JSON.stringify(message));
    delete consensus[block.hash];
}

function discardBlock(block: Block) {
    const message = {
        type: IType.BLOCK_DISCARDED,
        message: `Block is Discarded: ${block.hash}`,
        data: Xenit.chain
    }
    socket.publish(Event.XENIT_EVENT_0_0_1, JSON.stringify(message));
    delete consensus[block.hash];
}


