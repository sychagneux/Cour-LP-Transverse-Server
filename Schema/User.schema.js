import {User} from "../model/User";

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
  }
  input UserInput{
    _id: ID
    name: String
    pseudo: String
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
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
    
    users: async () => {
      return User.find().populate();
    },
    user: async (root, { _id }, context, info) => {
      return User.findOne({ _id });
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      await User.create(args);
      return true;
    },
    createUserWithInput: async (root, { input }, context, info) => {
      input.password = await bcrypt.hash(input.password, 10);
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
