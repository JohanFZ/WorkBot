import express from 'express';
import cors from 'cors'; //permite que se hagan peticiones por medio de diversos dominios
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv'; //manejar variables de entorno
import conectarBD from './db/db';
import { types } from './graphql/types';
import { resolvers } from './graphql/resolvers';
import { validateToken } from './utils/tokenUtils';

dotenv.config();

const getUserData = (token) => {

  const verificacion = validateToken(token.split(' ')[1]);

  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
}

const server = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers,
  context: ({ req }) => {
    const token = req.headers?.authorization ?? null;
    if (token) {
      //Obtener el token desde la variable req
      const userData = getUserData(token);
      if (userData) {
        return { userData }; //Usar la informacion en todo el back
      }
    }
    return null;
  }
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