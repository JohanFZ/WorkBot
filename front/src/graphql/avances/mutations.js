import { gql } from '@apollo/client';

const EDITAR_DESCRIPTION = gql`
  mutation EditarAvance($_id: String!, $descripcion: String!) {
    editarAvance(_id: $_id, descripcion: $descripcion) {
      _id
    }
  }
`;
const EDITAR_OBSERVACION = gql`
  mutation editarObservacion(
    $id: String!
    $indexObservacion: Int!
    $observacion: camposObservacion!
  ) {
    editarObservacion(_id: $id, indexObservacion: $indexObservacion, observacion: $observacion) {
      _id
      observaciones {
        _id
        descripcion
      }
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation crearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const CREAR_OBSERVACION = gql`
  mutation crearObservacion($_id: String!, $observacion: String!) {
    crearObservacion(_id: $_id, observacion: $observacion) {
      _id
      observaciones
    }
  }
`;

export { EDITAR_DESCRIPTION, EDITAR_OBSERVACION, CREAR_AVANCE, CREAR_OBSERVACION };
