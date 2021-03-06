import cluster from "cluster";
import express from "express";
import expressGQL from "express-graphql";
import morgan from "morgan";
import os from "os";

import { schema } from "./programmatic-schema";

if (cluster.isMaster) {
    // Count the machine's CPUs
    const cpuCount = os.cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    const app = express();
    const port = 3000;

    // app.use(morgan("tiny"));

    // You could use a parameter here for Customer ID, and then wrap the expressGQL middleware here with
    // something that can pass in a user-specific schema (i.e. a schema generated at runtime, however
    // this would not get around the issue of having to reload the application to update the schema,
    // which we need to avoid.
    //
    // An alternative route would be to create a custom middleware specifically designed to respond
    // using the basic `graphql` package, where we _can_ dynamically create the schema when it's
    // requested. We would definitely need to figure out how to cache the schema though. Lucky for us,
    // content is highly cache-able!
    app.use("/seeruk/graphql", expressGQL({
        schema: schema,
        // rootValue: resolvers,
        graphiql: true,
    }));

    const server = app.listen(port, function() {
        const host = server.address().address;
        const port = server.address().port;

        console.log("GraphQL listening at http://%s:%s", host, port);
    });
}
