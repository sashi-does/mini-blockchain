
import type { Block } from "../types/chain";

export enum IType {
    WELCOME = "WELCOME",
    INVALID_BLOCK = "INVALID_BLOCK",
    BLOCK_MINED = "BLOCK_MINED",
    NEW_BLOCK = "NEW_BLOCK"
}

export interface ChainResponse {
    type: IType;
    message: string;
    data?: Block[] | Block
}
