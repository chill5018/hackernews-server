const { GraphQLServer } = require('graphql-yoga')

// Dummy Data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

/**
 * Constants define the GraphQL Schema
 */
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
  `

/**
 * The implementation of the GraphQL schema
 *
 * Tells the server what API operations are accepted
 * and how they should be resolved
 */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernes Clone`,
    feed: () => links,
  },
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

