export const CORS_HEADERS = {
    // TODO static URL
    "Access-Control-Allow-Origin": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com`,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers" : "content-type"
}
