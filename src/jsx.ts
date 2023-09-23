export declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any
        "m:use": {
            src: string,
            raw?: boolean,
        }
    }
    interface ElementAttributesProperty {
        props: any;
    }
    type Element = string
}

type Factory<T> =
    (
        tag: T | string,
        attr: {
            [key: string]: any
            children?: T | string | (T | string)[]
        }
    ) => T | string

    const jsx: Factory<(arg: any) => JSX.Element> =
    (tag, att) => {
        console.log(tag)
        if (typeof tag == "function")
            return tag(att)

        if (typeof tag == "string") {
            if (tag == "m:importMap") {
                return ``
                    +`<script type="importmap">`
                    +Deno.readTextFileSync(att.src)
                    +`</script>`
            }
            if (tag =="m:use") {
                if (att.src.endsWith(".css")) {
                    if (att.raw) {
                        return ``
                            +`<style>`
                            +Deno.readTextFileSync(att.src)
                            +`</style>`
                    }
                    return ``
                        +`<link rel="stylesheet" `
                        +`href="${att.src}" `
                        +`type="text/css"></link>`
                }
                return ``
                    +`<script type="module" `
                    + (att.raw
                        ? (">"+Deno.readTextFileSync(att.src))
                        : `src="${att.src}">`)
                    +`</script>`
            }
            let { children } = att
            if (!children) children = []
            if (!Array.isArray(children)) children = [children]

            const props =
                Object.entries(att)
                    .filter(([k]) => k != "children")
                    .map(([k, v]) => `${k}="${v}"`)
                    .join(" ")
        
            return ``
                +`<${tag} ${props}>`
                +`${children.join("")}`
                +`</${tag}>`
        }
        return ""
    }

export const Fragment = "div"

export {
    jsx,
    jsx as jsxs,
}