import { gql } from "apollo-server-express";

const typesInscripcion = gql`
  type Inscripcion {
    _id: ID
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: User!
  }
  type Query {
    Inscripciones: [Inscripcion]
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion!
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    aprobarInscripcion(
      id: String!
      fechaIngreso: Date!
    ): Inscripcion
    rechazarInscripcion(
      id: String!
      fechaIngreso: Date!
    ): Inscripcion
  }
`;

export { typesInscripcion };