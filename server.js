import express from "express";

const app = express();
const port = 3000;

app.post("/graphql", (req, res) => {
    res.send("Hello!");
});

const server = app.listen(port, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("GraphQL listening at http://%s:%s", host, port);
});
