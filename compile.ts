import { compile } from "npm:@mdx-js/mdx@2.3.0"

const tseval =
    (code: string) =>
    import("data:application/javascript," + encodeURIComponent(code))

const compiled = String(await compile(
    await Deno.readTextFile("test.mdx"),
    {
        jsxImportSource: "jsx"
    }
))

const {default: v} = await tseval(compiled)

console.log(v())