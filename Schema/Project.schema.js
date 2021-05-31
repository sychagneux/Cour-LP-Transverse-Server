import {Project} from "../model/Project";

const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

export const typeDef = `
  type Project {
    _id: ID!
    name: String,
    description: String,
    projects: [Project],
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
    createProject(name: String!,description: String!): Boolean
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
      let projects = [];
      for (let index = 0; index < 5; index++) {
        projects.push(dummy(Project, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return projects;
    },
    project: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return User.findOne({ _id });

      //Mogoose dummy
      return dummy(Project, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      await Project.create(args);
      return Project.name;
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      return Project.remove({ _id });
    },
    updateProject: async (root, { _id, input }) => {
      return Project.findByIdAndUpdate(_id, input, { new: true });
    }
  }
};
