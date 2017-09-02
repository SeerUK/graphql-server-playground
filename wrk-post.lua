wrk.method = "POST"
wrk.body = 'query { post(id: "2") { title } }'
wrk.headers["Content-Type"] = "application/graphql"
