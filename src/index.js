const { GraphQLServer } = require('graphql-yoga')

// Dummy Data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

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
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

