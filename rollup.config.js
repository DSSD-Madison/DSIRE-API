import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"


export default [
{
    input: "api/index.ts",
    output: {
        file: "dist/api/index.mjs",
        sourcemap: process.env.NODE_ENV === "production" ? undefined : "inline",
        format: "es"
    },
    plugins: [
        nodeResolve(),
        typescript()
    ]
},
{
    input: "frontend/scripts/index.ts",
    output: {
        file: "dist/frontend/scripts/index.js",
        sourcemap: process.env.NODE_ENV === "production" ? undefined : "inline",
        format: "iife",
        name: "Frontend"
    },
    plugins: [
        nodeResolve(),
        typescript()
        // terser
    ]
}
]
