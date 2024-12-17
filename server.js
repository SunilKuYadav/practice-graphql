const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
      hello: String
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return "Hello World";
  },
};

const app = express();

// create and use GraphQL handler.

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
  })
);

// start the server
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})