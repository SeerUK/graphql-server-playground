import * as graphql from "graphql";

const authors = [
    {
        id: "1",
        name: "Elliot Wright",
        title: "Software Engineer",
    },
];

const posts = [
    {
        id: "1",
        title: "I wish Go's GraphQL was more mature...",
        content: "Hello, World!",
        authorId: "1",
    },
];

export const AuthorType = new graphql.GraphQLObjectType({
    name: "Author",
    description: "The author of some content.",
    fields: {
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
            description: "The author's name.",
        },
        title: {
            type: graphql.GraphQLString,
            description: "The author's job description.",
        },
    },
});

export const PostType = new graphql.GraphQLObjectType({
    name: "Post",
    description: "A blog post, including all of it's content.",
    fields: {
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
        title: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
            description: "The post's title.",
        },
        content: {
            type: graphql.GraphQLString,
            description: "The post's content (can be empty).",
        },
        author: {
            type: new graphql.GraphQLNonNull(AuthorType),
            description: "The post's author.",
            args: {
                id: {
                    type: graphql.GraphQLString,
                },
            },
            resolve: ({ authorId }) => authors.filter(author => author.id === authorId)[0],
        },
    },
});

export const QueryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        post: {
            type: PostType,
            args: {
                id: {
                    type: graphql.GraphQLString,
                },
            },
            resolve: (_, { id }) => posts.filter(post => post.id === id)[0],
        },
    },
});

export const schema = new graphql.GraphQLSchema({
    query: QueryType,
});
