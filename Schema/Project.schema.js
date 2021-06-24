import {Task} from "../model/Task";
import {Project} from "../model/Project";

const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

export const typeDef = `
  type Project {
    _id: ID!
    name: String,
    description: String,
    tasks: [Task],
  }
  input ProjectInput{
    name: String,
    description: String,
  }
  extend type Query {
    projectSchemaAssert: String
    projects: [Project]
    project(_id: ID!): Project
  }
  extend type Mutation {
    createProject(name: String!,description: String!): Project
    createProjectWithInput(input: ProjectInput!): Project
    deleteProject(_id: ID!): Boolean
    updateProject(_id: ID!,input: ProjectInput!): Project
  }
`;

export const resolvers = {
  Query: {
    projectSchemaAssert: async () => {
      return "Hello world, from Project schema";
    },
    
    projects: async () => {
      return Project.find().populate("tasks");
    },
    project: async (root, { _id }, context, info) => {
      return Project.findOne({ _id }).populate("tasks");
    },
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      var project = await Project.create(args);
      return project;
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      var project = await Project.remove({ _id });
      return true;
    },
    updateProject: async (root, { _id, input }) => {
      return Project.findByIdAndUpdate(_id, input, { new: true });
    }
  }
};
