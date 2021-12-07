import { gql } from "apollo-server-express";

const typesUser = gql`

  type User {
    _id: ID
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol
    estado: Enum_EstadoUsuario!
  }


  type Query {
    Users: [User]
    User(_id: String!): User
  }

  type Mutation {

    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ):User

    eliminarUsuario( _id: String, correo: String):User

    editarUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario!
    ):User
  }
`;

export { typesUser };