import { ApolloServer } from 'apollo-server';
import { schema } from "./schema";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const server = new ApolloServer({ schema });

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true });

//Launch the server
server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});