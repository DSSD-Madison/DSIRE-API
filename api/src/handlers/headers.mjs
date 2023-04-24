"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_HEADERS = void 0;
exports.CORS_HEADERS = {
    // TODO static URL
    "Access-Control-Allow-Origin": "https://dsire-api-hosting-".concat(process.env.STAGE, ".s3.amazonaws.com"),
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "content-type"
};
