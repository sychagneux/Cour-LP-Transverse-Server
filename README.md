# Cour-LP-Transverse-Server

Now graphql is configured, you can play with the api at [localhost:4000](localhost:4000)

<p>&nbsp;</p>

## 1️⃣ Create the schema for GraphQL

We gonna make an external schema, split the simple string schema to multiples files

```
📁 Model - Mongoose (Database)
     📃 User
     📃 Project
     📃 Tasks
     
📁 Schema - GraphQL Schema ( Typedefs & Resolvers )
     📃 User.schema
     📃 Project.schema
     📃 Tasks.schema
```

> 👍 This structure permit to the project to be more readable and maintainable.

You have to create a file `schema.js`

This file will import all the other schema files and merge them.

We gonna define for now the base schema and resolver vars.

```js 
// General query
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

const resolvers = {};

```

Then you can create some `Entity.schema.js`, one by entity you want to create.

In each `Entity.schema.js`, you have to define 2 variables: **typedefs** and **resolvers**, and export them.

These variable will be merged with other entities, on the `schema.js`.  

<p>&nbsp;</p>

## 2️⃣ USER In the file `User.schema.js`

For exemple for project `User.schema.js`, you will have

> ⚠️ Be careful, one thing change you have to **extend** the **query** type and the **mutation** type on your schema
> `extend type query `

``` js
export const typeDef = `

  #CREATE YOUR SCHEMA HERE

`

export const resolvers = {

  Query: {
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
  },
  Mutation: {
    
  }
}

```
  
<p>&nbsp;</p>

## 3️⃣ Merge User in `schema.js`

On your `schema.js`, import your User.schema.js:

``` js
// User typedefs and resolvers
import {
  typeDef as User,
  resolvers as userResolvers,
} from './schema/user.schema';

```

At the end of your file when you have imported all your entities, you can now merge them.

For each entity added on the `schema.js`, don't forget to add them in the **typedefs** and **resolvers**.

```js
// Do not forget to merge at the end of typeDefs and resolvers
export const schema = makeExecutableSchema({
  typeDefs: [ Query, User],
  resolvers: merge(resolvers, userResolvers),
});

```

Then you can update your index.js with the schema we have created.
``` js
import { ApolloServer, gql } from "apollo-server";
import { schema } from "./src/schema";

//Pass the schema to ApolloServer
const server = new ApolloServer({ schema })

//Launch the server
server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});
```
  
