import { gql } from "apollo-server-express";

const typesAdvancements= gql`

  type Advancement {
    _id: ID
    fecha: Date!
    descripcion: String!
    observaciones: [Observacion]
    creadoPor: User!
    proyecto: Proyecto!
  }

  type Observacion{
    _id: ID!
    descripcion: String!
  }

  input crearObservacion{
    descripcion: String!
  }

  input camposObservacion{
    descripcion: String!
  }

  type Query {
    Advancements: [Advancement]
    Advancement(_id: String!): Advancement
    AdvancesProject(proyecto: String):[Advancement]
  }

  type Mutation {

    crearAvance(
      fecha: Date!
      descripcion: String!
      observaciones: [crearObservacion]
      creadoPor: String!
      proyecto: String!
    ):Advancement

    eliminarAvance( _id: String ):Advancement

    editarAvance(
      _id: String!,
      descripcion: String!
    ):Advancement

    editarObservacion(
      _id: String!
      indexObservacion: Int!
      observacion:camposObservacion!
    ):Advancement

  }
`;

export { typesAdvancements };