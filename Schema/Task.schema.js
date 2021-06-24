import {Task} from "../model/Task";
import {Project} from "../model/Project";

const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

export const typeDef = `
  type Task {
    _id: ID!
    name: String,
    description: String,
    duration: String,
    status: Int
  }
  input TaskInput{
    name: String,
    description: String,
    duration: String,
    status: Int,
  }
  extend type Query {
    taskSchemaAssert: String
    tasks: [Task]
    task(_id: ID!): Task
  }
  extend type Mutation {
    createTask(name: String!,description: String!,duration: Int!,status: Int!): Boolean
    createTaskWithInput(input: TaskInput!): Task
    deleteTask(_id: ID!): Boolean
    updateTask(_id: ID!): Boolean
    addTaskToProject(_id: ID!,input: TaskInput!): Boolean
  }
`;

export const resolvers = {
  Query: {
    taskSchemaAssert: async () => {
      return "Hello world, from Task schema";
    },
    
    tasks: async () => {
      return Task.find();
    },
    task: async (root, { _id }, context, info) => {
      // With a real mongo db
      return Task.findOne({ _id });
    },
  },
  Mutation: {
    createTask: async (root, args, context, info) => {
      await Task.create(args);
      return true;
    },
    createTaskWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Task.create(input);
    },
    deleteTask: async (root, { _id }, context, info) => {
      var task = await Task.remove({ _id });
      return true;
    },
    updateTask: async (root, { _id }) => {
      await Task.findByIdAndUpdate(_id, { status: 1 });
      return true;
    },
    addTaskToProject: async (root, { _id, input }) => {
      var task = await Task.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          tasks: task
        }
      })
      project.save();
      return true;
    },
  }
};
