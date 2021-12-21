import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
mutation CrearInscripcion($estado: Enum_EstadoInscripcion!, $proyecto: String!, $estudiante: String!) {
  crearInscripcion(estado: $estado, proyecto: $proyecto, estudiante: $estudiante) {
    _id
  }
}
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
    aprobarInscripcion(id: $aprobarInscripcionId) {
      _id
    }
  }
`;

const RECHAZAR_INSCRIPCION = gql`
  mutation RechazarInscripcion($rechazarInscripcionId: String!) {
    rechazarInscripcion(id: $rechazarInscripcionId) {
      _id
    }
  }
`;
const CULMINAR_INSCRIPCION = gql`
  mutation CulminarInscripcion($proyecto: String!) {
    culminarInscripcion(proyecto: $proyecto) {
      _id
    }
  }
`;




export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION, CULMINAR_INSCRIPCION };