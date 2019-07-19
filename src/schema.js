import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";


const allTypes = fileLoader(path.join(__dirname,"/api/**/*.graphql"));
const allReslovers = fileLoader(path.join(__dirname,"/api/**/8.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers:mergeResolvers(allReslovers)
});

export default schema;