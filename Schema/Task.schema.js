import {Task} from "../model/Task";

const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

export const typeDef = `
  type Task {
    _id: ID!
    name: String,
    description: String,
    duration: String,
    Status: Int,
  }
  input TaskInput{
    name: String,
    description: String,
    duration: String,
    Status: Int,
  }
  extend type Query {
    taskSchemaAssert: String
    tasks: [Task]
    task(_id: ID!): Task
  }
  extend type Mutation {
    createTask(name: String!,description: String!): Boolean
    createTaskWithInput(input: TaskInput!): Task
    deleteTask(_id: ID!): Boolean
    updateTask(_id: ID!,input: TaskInput!): Task
    addTaskToProject(_id: ID!,input: TaskInput!): Boolean
  }
`;

export const resolvers = {
  Query: {
    taskSchemaAssert: async () => {
      return "Hello world, from Task schema";
    },
    
    tasks: async () => {
      let tasks = [];
      for (let index = 0; index < 5; index++) {
        tasks.push(dummy(Task, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return tasks;
    },
    task: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return User.findOne({ _id });

      //Mogoose dummy
      return dummy(Task, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
    createTask: async (root, args, context, info) => {
      await Task.create(args);
      return Task.name;
    },
    createTaskWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Task.create(input);
    },
    deleteTask: async (root, { _id }, context, info) => {
      return Task.remove({ _id });
    },
    updateTask: async (root, { _id, input }) => {
      return Task.findByIdAndUpdate(_id, input, { new: true });
    },
    addTaskToProject: async (root, { _id, input }) => {
      var task = await Task.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          tasks: task
        }
      })
      console.log(task)
      console.log(project)
      project.save();
      return true;
    },
  }
};
