import { ec } from "elliptic"

const cryp = new ec("secp256k1");

const keypair = cryp.genKeyPair();

const publicKey = keypair.getPublic("hex");
const privateKey = keypair.getPrivate("hex");

console.log(publicKey)
console.log(privateKey)

// 044315d20cf80c371a1d11c12f5fb42f92bf136ba1a02c91783bab645aa3365f25d2599c2cb6972ff35077f0f036a8c18eff0161bd721619bea7d358006f887314

// e9de634c32cbdae805e34dc60fe656640a5a58de6d89ea3d180ac472e1620a98