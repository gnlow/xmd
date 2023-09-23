export declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any
    }
    interface ElementAttributesProperty {
        props: any;
    }
    type Element = string
    type Children = Element | string | (Element | string)[] | undefined
    type Attr = {
        tag: Element | string,
        children: Children
    }
}

const normalChildren = (children: JSX.Children) => {
    children = children || []
    if (!Array.isArray(children)) children = [children]
    return children
}

const $ =
    (f: (s: string) => string) =>
    ({children}: JSX.Attr) =>
    f(normalChildren(children).join(""))

const components: Record<string, (props: JSX.Attr) => string> = {
    h1: $(s => `# ${s}`),
    p: $(s => `\n${s}\n`),
}

const omit = (o: any, k: string) =>
    Object.fromEntries(
        Object.entries(o)
        .filter(([x]) => x != k)
    )

type Factory<T> =
    (
        tag: T | string,
        attr: JSX.Attr,
    ) => string

    const jsx: Factory<(arg: any) => JSX.Element> =
    (tag, att) => {
        const children = normalChildren(att.children)

        if (typeof tag == "string") {
            if (tag in components) {
                return components[tag](att)
            } else {
                const props =
                    Object.entries(omit(att, "children"))
                        .map(([k, v]) => `${k}="${v}"`)
                        .join(" ")
                return ``
                    +`<${tag}${props.length ? " " : ""}${props}>`
                    +`${children.join("")}`
                    +`</${tag}>`
            }
        }
        if (typeof tag == "function") {
            return tag(att)
        }
        return ""
    }

export const Fragment =
    ({children}: JSX.Attr) =>
    normalChildren(children)
        .join("")

export {
    jsx,
    jsx as jsxs,
}