import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import {
    typeDef as User,
    resolvers as userResolvers,
} from './Schema/User.schema';

import {
    typeDef as Project,
    resolvers as projectResolvers,
} from './Schema/Project.schema';

import {
    typeDef as Task,
    resolvers as taskResolvers,
} from './Schema/Task.schema';

const resolvers = {};

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
    typeDefs: [ Query, User, Project, Task],
    resolvers: merge(resolvers,userResolvers,projectResolvers,taskResolvers),
});