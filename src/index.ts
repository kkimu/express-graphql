import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: Hello
  }
  
  type Hello {
    id: Int!
    message: String!
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return {
      id: 1,
      message: 'Hello world!',
    }
  },
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

const PORT = 4041

app.listen(PORT)

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
