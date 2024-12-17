const { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
      hello: String
    }
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return "Hello World";
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue
}).then(res => console.log(res))