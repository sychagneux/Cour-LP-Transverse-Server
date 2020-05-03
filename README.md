# Cour-LP-Transverse-Server

- Init of the node.js app

- Use appolo server

- Try to do some Queries and Mutation

- Make the schema

- Database creation 

- (Mongoose)


## First step 

Creation of a git repo. 

git clone https://github.com/pipic1/Cour-LP-Transverse-Server.git

Now initialisation of the project
```sh
# Creation of the package.json
npm init --yes
npm install apollo-server graphql
mkdir src
touch index.js
New-Item -ItemType file index.js
```

## Edit index.js

Now in the file index.js, we gonna create our server.
Edit the file, and then write this code: 

import { ApolloServer,gql } from 'apollo-server';

Write a schema:

```

type Book {
  title: String
  author: String
}

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

