export default (strings: TemplateStringsArray, ...values: unknown[]): string =>
`<!DOCTYPE html>
<html>
    ${String.raw({raw: strings}, ...values)}
</html>
`
