# Cour-LP-Transverse-Server

This first TP explain how to make a simple GraphQL server.

- Init of the node.js app

- Use appolo server

- Try to do some Queries and Mutation

- Make the schema

- Database creation 

- (Mongoose)


## 1️⃣ Repo creation 

Creation of a git repo. 

git clone https://github.com/pipic1/Cour-LP-Transverse-Server.git

Now initialisation of the project
```sh
# Creation of the package.json
npm init --yes
npm install apollo-server graphql
mkdir src
// linux: touch index.js or Powershell: New-Item -ItemType file index.js
```

<p>&nbsp</p>
<p>&nbsp</p>


## 2️⃣ Dependencies (pasckage.json)


Edit your package.json 

```
  "dependencies": {
    "apollo-server": "^2.24.0",
    "babel-cli": "^6.26.0",
    "babel-node": "0.0.1-security",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "dotenv": "^8.2.0",
    "graphql": "^15.0.0",
    "graphql-tools": "^4.0.7",
    "lodash": "^4.17.21",
    "mongodb": "^3.5.5",
    "mongoose": "^5.12.7",
    "mongoose-dummy": "^1.0.8",
    "nodemon": "^2.0.3"
  },
  "devDependencies": {
    "@babel/cli": "^7.13.16",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5"
  }
```

Then run 

```

$ > npm install

```

<p>&nbsp</p>

<p>&nbsp</p>


## 3️⃣ Adapt index.js

Now in the file index.js, we gonna create our server.
Edit the file, and then write this code: 
[Schema basics](https://www.apollographql.com/docs/apollo-server/schema/schema/)

```
import { ApolloServer,gql } from 'apollo-server';
```

Write a schema:

```
const typeDefs = gql`
    type Book {
      title: String
      author: String
    }
    `;
```
In your schema add the query type that describe all query that you can get

```

type Query {
  books: [Book]
}

```

Write a resolvers:


```
const resolvers = {
    Query: {
      books: () => books,
    },
  };
```

Add some dummy datas: 


```

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

```

Then init AppoloServer: 

``` const server = new ApolloServer({ typeDefs, resolvers }); ```

Start the server : 

```
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Then run 

```

$ > npm start

```

Go to http://localhost:4000/
