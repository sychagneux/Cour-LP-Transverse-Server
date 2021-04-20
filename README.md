# Cour-LP-Transverse-Server

## MongoDB use

We gonna add a package that permit to define some environement vars.

Install the dotenv package to your server project, with the following command 

For more information about [DotEnv, click here](https://www.npmjs.com/package/dotenv)

```
npm install dotenv
```

That will create a `.env` file in your project, if not create it.

In this file you can now set some varaibles that permit to configure your server.

These vars can be use in the whole project.

In the file set the **database name** and **url**

``` js

MONGO_URL = 'mongodb://localhost:27017/projectApp'
PORT = 4000
IP_ADDRESS = localhost 

```

## In `index.js`

We will now import dotenv file and mongoose:

``` js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
```

And connect the mongoose database, fot that use :

With `process.env` you can acces to all variables in `.env` file

``` js
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true });
```

Now you can request some Data in your database.

You can use collection on your resolvers like seen in the courses.

## Data interaction

Now you can use mongo collection, to get all users simply use :

``` js
  return User.find();
```

In `project.schema.js`, you can for example create a query `addTaskToProject`

This `query` permit to add a task object in the `tasks` field of a project.

> Don't forget to add it in your schema

[FindOneAndUpdate](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate) documentation and usage.

Push task in the Project.Tasks field, check [$push](https://docs.mongodb.com/manual/reference/operator/update/push/), it will simply push data in an array.


<details>
  <summary>Get the solution here</summary>


``` js

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

```

</details>
