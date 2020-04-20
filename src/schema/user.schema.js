// user.js
import {User} from "../models/User";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type User {
    _id: ID!
    name: String
    surname: String
    pseudo: String
    password: String
    token: String
    projects: [Project]
  }

  input UserInput{
    name: String
    surname: String
    pseudo: String
    password: String
    token: String
  }


  extend type Query {
    userSchemaAssert: String
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(name: String!,pseudo: String!): Boolean
    createUserWithInput(input: UserInput!): User
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!,input: UserInput!): User
  }

`;

export const resolvers = {
  Query: {
    // Get all users
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
    // Get all users
    users: async () => {
      let users = [];
      for (let index = 0; index < 5; index++) {
        users.push(dummy(User, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return users;
    },
    // Get user by ID
    user: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return User.findOne({ _id });

      //Mogoose dummy
      return dummy(User, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      await User.create(args);
      return User.name;
    },
    createUserWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return User.create(input);
    },
    deleteUser: async (root, { _id }, context, info) => {
      return User.remove({ _id });
    },
    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    }
  }
};
