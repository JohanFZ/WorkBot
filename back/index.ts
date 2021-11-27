import express from 'express';
import cors from 'cors'; //permite que se hagan peticiones por medio de diversos dominios
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv'; //manejar variables de entorno
import conectarBD from './db/db';
// import { types } from './graphql/types';
// import { resolvers } from './graphql/resolvers';

dotenv.config();

const server = new ApolloServer({
  // typeDefs: types,
  // resolvers: resolvers,
})

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });

  console.log("Servidor Listo");

});