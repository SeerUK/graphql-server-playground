wrk.method = "POST"
wrk.body = [[{ "query": "{ human(id: \"1000\") { name } }", "variables": null, "operationName": null }]]
wrk.headers["Content-Type"] = "application/graphql"
