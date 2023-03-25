// Run via a node environment to generate a public/private RSA-OAEP keypair of
// 2048-bit keys using SHA-256 hashes as stringified JWKs on standard out


import {subtle as SubtleCrypto} from "crypto"


function genRsaOaep256(len = 2048) {
    return SubtleCrypto.generateKey({
        name: "RSA-OAEP",
        modulusLength: len,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
    }, true, ["encrypt", "decrypt"]);
}


const keys = await genRsaOaep256();
console.log("RSA-OAEP/SHA-256 4096-bit public key (JWK):");
console.log(JSON.stringify(await SubtleCrypto.exportKey("jwk", keys.publicKey)))
console.log("RSA-OAEP/SHA-256 4096-bit private key (JWK):");
console.log(JSON.stringify(await SubtleCrypto.exportKey("jwk", keys.privateKey)))
