import { Block } from "./block";

export enum IType {
    // Greetings
    WELCOME = "WELCOME",

    // Message by Miner
    BLOCK_ACCEPTED = "BLOCK_ACCEPTED",
    BLOCK_REJECTED = "BLOCK_REJECTED",

    // Confirmation from Blockchain
    NEW_BLOCK = "NEW_BLOCK", 
    INVALID_MINER_ADDRESS = "INVALID_MINER_ADDRESS",
    INVALID_TXNS = "INVALID_TXNS",
    VALID_TXNS = "VALID_TXNS",
    BLOCK_FINALIZED = "BLOCK_FINALIZED",
    BLOCK_DISCARDED = "BLOCK_DISCARDED",
    CHAIN_UPDATE = "CHAIN_UPDATE",
}

export interface ChainResponse {
    type: IType;
    message: string;
    data: Block[] | Block
}

export interface MinerResponse {
    type: IType;
    message: String;
    data?: String;
}

export enum Event {
    XENIT_EVENT_0_0_1 = "XENIT_EVENT_0_0_1",
}