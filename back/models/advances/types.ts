import { gql } from "apollo-server-express";

const typesAdvancements= gql`

  type Advancement {
    _id: ID
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    creadoPor: User!
    proyecto: Project!
  }

  type Query {
    Advancements: [Advancement]
  }

  type Mutation {

    crearAvance(
      fecha: Date!
      descripcion: String!
      observaciones: [String]
      creadoPor: String!
      proyecto: String!
    ):Advancement

  }
`;

export { typesAdvancements };