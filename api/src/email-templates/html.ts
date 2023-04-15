export default (strings: any, ...values: any): string => String.raw({raw: strings}, ...values);
