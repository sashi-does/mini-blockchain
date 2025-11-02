import { Block } from "./block";
import { Transaction } from "./transaction";

export enum IType {
    // Greetings
    WELCOME = "WELCOME",

    // Block Proposals from Miner
    INVALID_BLOCK = "INVALID_BLOCK",
    BLOCK_MINED = "BLOCK_MINED",
    NEW_BLOCK = "NEW_BLOCK", 

    // Message by Miner
    BLOCK_ACCEPTED = "BLOCK_ACCEPTED",
    BLOCK_REJECTED = "BLOCK_REJECTED",

    // Confirmation from Blockchain
    BLOCK_FINALIZED = "BLOCK_FINALIZED",
    BLOCK_DISCARDED = "BLOCK_DISCARDED",
    CHAIN_UPDATE = "CHAIN_UPDATE",
}

export interface ChainResponse {
    type: IType;
    message: string;
    data?: Block[] | Block
}

export enum Event {
    XENIT_EVENT_0_0_1 = "XENIT_EVENT_0_0_1",
}