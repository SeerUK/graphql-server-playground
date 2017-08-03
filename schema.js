import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt
} from "graphql/type";

let count = 0;

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            count: {
                type: GraphQLInt,
                description: "The count! (Not Dracula)",
                resolve: () => count
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutationType",
        fields: {
            updateCount: {
                type: GraphQLInt,
                description: "Updates the count.",
                resolve: () => ++count
            }
        }
    })
})
