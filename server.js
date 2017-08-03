import bodyParser from "body-parser";
import express from "express";
import { graphql } from "graphql";

import schema from "./schema";

const app = express();
const port = 3000;

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post("/graphql", (req, res) => {
    graphql(schema, req.body)
        .then((result) => {
            res.send(JSON.stringify(result, null, 2));
        });
});

const server = app.listen(port, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("GraphQL listening at http://%s:%s", host, port);
});
