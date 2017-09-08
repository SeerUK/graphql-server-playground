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
    {
        id: "2",
        title: "We could make the schema programmatically, dynamically!",
        content: "Well I'll be damned",
        authorId: "1",
    },
];

const findContentEntryById = (type, id) => new Promise((resolve, reject) => (
    resolve(null)
));

const findAuthorById = (id) => new Promise((resolve, reject) => (
    resolve(authors.filter(author => author.id === id)[0])
));

const findPostById = (id) => new Promise((resolve, reject) => (
    resolve(posts.filter(post => post.id === id)[0])
));

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
            resolve: ({ authorId }) => findAuthorById(authorId),
        },
    },
});

export const QueryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        allAuthors: {
            type: new graphql.GraphQLList(AuthorType),
            resolve: () => authors,
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: graphql.GraphQLString,
                },
            },
            resolve: (_, { id }) => findAuthorById(id),
        },
        allPosts: {
            type: new graphql.GraphQLList(PostType),
            resolve: () => posts,
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: graphql.GraphQLString,
                },
            },
            resolve: (_, { id }) => findPostById(id),
        },
    },
});

export const schema = new graphql.GraphQLSchema({
    query: QueryType,
});
