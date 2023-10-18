import {GraphQLScalarType} from "graphql";


// HACK as any (check that things are actually Date, GraphQLError when not)
export default new GraphQLScalarType({
    name: "Date",
    description: "TODO",

    // Backend to frontend
    serialize(value) {
        return (value as any).toString();
    },
    // Frontend to backend via (JSON) variable
    parseValue(value) {
        console.log("hi");
        console.log(Date.parse(value as any));
        return new Date(value as any);
    },
    // Frontend to backend via (AST) hardcode
    parseLiteral(ast) {
        return new Date((ast as any).value);
    }
});
