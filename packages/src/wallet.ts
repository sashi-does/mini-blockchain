import { ec } from "elliptic"

export const EC = new ec('secp256k1');

export const wallet = EC.genKeyPair();

// pb:044467d832ad351f0b31987103e9df49214c6aa96295f5d5fa8211f26bb945d8a0b5461e471ea5cbc496f163a104bfc0991b2bf792c473378e74bce32236d124e7


// pv:e04ab86a911efc949bc17a1355e0b82a07745610b6f80c2f42c0ebb1472f8d71
