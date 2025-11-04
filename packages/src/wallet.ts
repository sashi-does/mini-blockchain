import { ec } from "elliptic"
import { Transaction } from "./transaction";
import { Blockchain } from "./blockchain";

export const EC = new ec('secp256k1');

export const wallet = EC.genKeyPair();


// Wallet 1:
// Private: e5f9359c0d0194dcc8b6ac0f4cccc848c0176c099dfccf30f0ff92e1d86c8571
// Public: 048ed16d68999a37497c06e583b1567d130e15ff87a7c707d3560fce118a0b4561471b7edae19d2a6c7e9dd65f40f3cbece0824837c49e38470770a474fd3e8160

// Wallet 2:
// Private: cf55f50e68dacc5540ac438ef8e9d90eaf74794e3791d838b0bac34f395aa18c
// Public: 0472f982b7679c6bbfa26d86013a0a6cc7bea7691d93932b12df3a5ac1c38a833b8e513c02a20025d49746bfdc8738e4c4dce191f8695bf3e4eceaa4b6b7c66400

// Wallet 3:
// Private: bd606f34d79bc660e9fda534ee47f0e18f2e304750a41ccab3f88d54e4b02407
// Public: 04cd5b2ee0f54e703d985e3392c8523664c4799918cb51c38b623df85d527b51494c060219233402e931934842f01f3232abb78d225c90640e2e72fb8335848a43

