import { buildSchema } from "graphql";

class Author {
    constructor({ id, name, title }) {
        this.id = id;
        this.name = name;
        this.title = title;
    }
}

class Post {
    constructor({ id, title, content, authorId }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }

    author() {
        return authors[this.authorId];
    }
}

const authors = {
    "1": new Author({
        id: "1",
        name: "Elliot Wright",
        title: "Software Engineer",
    })
};

const posts = {
    "1": new Post({
        id: "1",
        title: "I wish Go's GraphQL was more mature...",
        content: "Hello, World!",
        authorId: "1",
    }),
};

export const schema = buildSchema(`
    type Author {
        id: String!
        name: String
        title: String
    }

    type Post {
        id: String!
        title: String!
        author: Author!
        content: String
    }

    type Query {
        post(id: String): Post
    }
`);

export const resolvers = {
    post: ({ id }) => posts[id],
};
