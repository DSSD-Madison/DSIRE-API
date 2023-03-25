import {subtle as SubtleCrypto} from "crypto"

import {compactDecrypt,
        CompactEncrypt,
        JWTPayload,
        jwtVerify,
        SignJWT} from "jose"



export async function mintJWS(
    payload: JWTPayload,
    sub: string,
    expirationTime: number | string,
    issuer: string="DSIRE-API",
    secret: string=process.env.SIGNING_SECRET
): Promise<string> {

    return new SignJWT(payload)
            .setProtectedHeader({alg: "HS256"})
            .setIssuer(issuer)
            .setSubject(sub)
            .setIssuedAt()
            .setExpirationTime(expirationTime)
            .sign(new TextEncoder().encode(secret));
}


export async function mintJWE(
    plaintext: object | string,
    key: CryptoKey | string=process.env.PUBLIC_KEY
): Promise<string> {

    if (typeof plaintext === "object") plaintext = JSON.stringify(plaintext);
    if (typeof key === "string") key = await SubtleCrypto.importKey("jwk", JSON.parse(key), {name: "RSA-OAEP", hash: "SHA-256"}, false, ["encrypt"]);

    return new CompactEncrypt(new TextEncoder().encode(plaintext))
            .setProtectedHeader({alg: "RSA-OAEP-256", enc: "A256GCM"})
            .encrypt(key);
}


export async function decryptJWE(
    token: string,
    key: CryptoKey | string=process.env.PRIVATE_KEY
): Promise<string> {

    if (typeof key === "string") key = await SubtleCrypto.importKey("jwk", JSON.parse(key), {name: "RSA-OAEP", hash: "SHA-256"}, false, ["decrypt"]);

    return new TextDecoder().decode((await compactDecrypt(token, key)).plaintext)
}


export async function checkJWS(
    token: string,
    sub: string,
    issuer: string="DSIRE-API",
    secret: string=process.env.SIGNING_SECRET
): Promise<JWTPayload> {

    return (await jwtVerify(token, new TextEncoder().encode(secret), {
        issuer,
        subject: sub
    })).payload
}
