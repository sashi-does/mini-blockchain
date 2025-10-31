
import type { Block } from "../types/chain";

export enum IType {
    WELCOME,
    INVALID_BLOCK,
    BLOCK_MINED,
    NEW_BLOCK
}

export interface ChainResponse {
    type: IType;
    message: string;
    data?: Block[]
}
