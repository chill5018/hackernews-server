const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

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
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
      // db is the prisma-binding
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description
        },
      }, info )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new WebGLShaderPrecisionFormat({
      typeDefs: 'src/generated.graphql',
      endpoint: 'http://localhost:4466',
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

