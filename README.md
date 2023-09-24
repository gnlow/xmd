# xmd
MDX -> MD

```jsx
export const Skills = (_, {s}) => <img
    height="20px"
    src={"https://skillicons.dev/icons?i=" + s}
/>
export const name = "Gnlow"

# Hi, my name is {name}.
I love <Skills s="ts,deno">
```
```
deno run -A https://deno.land/x/xmd/compile.ts README.mdx
```
```
deno run --allow-read --allow-write --allow-net https://deno.land/x/xmd/compile.ts README.mdx
```
Need `--allow-net` to eval generated code using dynamic import.