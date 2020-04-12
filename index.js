import { ApolloServer,gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    name: String
    surname: String
    login: String
    pass: String
    token: String
    projects: [Project]
  }

  type Project {
    name: String
    description: String
    tasks: [Task]
  }

  type Task {
    name: String
    description: String
    duration: String
    Status: Int
  }

  type Query {
    users: [User]
    projects: [Project]
    Tasks: [Task]
  }
`;


const users = [
    {
      name: "Doe",
      surname: "John",
      login: "user1",
      pass: "password1"
    },
    {
      name: "C. Harden",
      surname: "James",
      login: "user2",
      pass: "password2"
    },
  ];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
const resolvers = {
    Query: {
      users: () => users,
    },
  };

// Typedefs like see in the course, "type definition", is your object schema
// Resolvers are all the methode that make the resolution of the data 
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(` 🚀  Server ready at ${url} `);
});