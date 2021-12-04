import { gql } from "apollo-server-express";

const typesAdvancements= gql`

  type Advancement {
    _id: ID
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    creadoPor: User!
    proyecto: Proyecto!
  }

  type Query {
    Advancements: [Advancement]
    Advancement(_id: String!): Advancement
  }

  type Mutation {

    crearAvance(
      fecha: Date!
      descripcion: String!
      observaciones: [String]
      creadoPor: String!
      proyecto: String!
    ):Advancement

    eliminarAvance( _id: String ):Advancement

    editarAvance(
      _id: String!,
      fecha: Date!
      descripcion: String!
      observaciones: [String]
      creadoPor: String!
      proyecto: String!
    ):Advancement

  }
`;

export { typesAdvancements };