import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"


export default {
    input: "api/index.ts",
    output: {
        file: "dist/api/index.cjs",
        sourcemap: process.env.NODE_ENV === "production" ? undefined : "inline",
        format: "cjs"
    },
    external: [
        "@aws-sdk/types",
        "@types/aws-lambda"
    ],
    plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        typescript()
    ]
}
