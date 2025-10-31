export interface Transaction {
    getHash: () => string;
}

export interface Block {
    timestamp: Date;
    nonce: number;
    data: Transaction[];
    hash: string;
    prevHash: string;
}