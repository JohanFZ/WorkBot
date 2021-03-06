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
    InscripcionesProyectos(estudiante: String):[Inscripcion]
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion!
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    aprobarInscripcion(
      id: String!
    ): Inscripcion
    rechazarInscripcion(
      id: String!
    ): Inscripcion
    culminarInscripcion(
      proyecto: String!
    ): Inscripcion
  }
`;

export { typesInscripcion };