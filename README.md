# Cour-LP-Transverse-Server

Now graphql is configured, you can play with the api at localhost:4000

## 1️⃣ Part 2 

We gonna make an external schema, split the simple string schema to multiples files

```
📁 Model - Mongoose (Database)
     📃 User
     📃 Project
     📃 Task
     
📁 Schema - GraphQL Schema ( Typedefs & Resolvers )
     📃 User.schema
     📃 Project.schema
     📃 Task.schema
```

Now in this part you can add all your entities to match with the specification.

In the next part we gonna link the Mongoose Model with the database 🗃️ 
