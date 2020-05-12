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

Now in the file index.js, we gonna create our schema.
The schema of the master was a sample.

On the gql replace the schema with the UML view in the course.

<details>
  <summary>Get the solution here</summary>
 
```
const typeDefs = gql`
  type User {
    name: String
    surname: String
    login: String
    pass: String
    token: String
    projects: [Project]
  }
  type Project {
    name: String
    description: String
    tasks: [Task]
  }
  type Task {
    name: String
    description: String
    duration: String
    Status: Int
  }
  type Query {
    users: [User]
    projects: [Project]
    Tasks: [Task]
  }
`; 
```

</details>

Now create some users, with dummy data.


```
const users = [
    {
      name: "Doe",
      surname: "John",
      login: "user1",
      pass: "password1"
    },
    {
      name: "C. Harden",
      surname: "James",
      login: "user2",
      pass: "password2"
    },
  ];
```

Change the query in the resolvers

And then check the result on localhost:4000/ 

You can try the following query on the playground: 

```
query {
  users{
    name
    surname
  }
}
```

You may obtain some result by the server.

