import express from "express";
import expressGQL from "express-graphql";

import { resolvers, schema } from "./schema";

const app = express();
const port = 3000;

app.use("/graphql", expressGQL({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

const server = app.listen(port, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("GraphQL listening at http://%s:%s", host, port);
});
