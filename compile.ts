import { compile } from "npm:@mdx-js/mdx@2.3.0"

const tseval =
    (code: string) =>
    import("data:application/javascript," + encodeURIComponent(code))

const [input] = Deno.args
if (!input.endsWith(".mdx"))
    throw "File name should ends with `.mdx`."

const compiled = String(await compile(
    await Deno.readTextFile(input),
    {
        jsxImportSource: "jsx"
    }
))

const {default: result} = await tseval(compiled)

const output = input.substring(0, input.length-1)

const text = `${input} -> ${output} `
console.time(text)
await Deno.writeTextFile(output, result())
console.timeEnd(text)