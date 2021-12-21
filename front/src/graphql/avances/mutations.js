import { gql } from '@apollo/client';

const EDITAR_DESCRIPTION = gql`
  mutation EditarAvance(
    $_id: String!
    $descripcion: String!
  ) {
  editarAvance(
    _id: $_id
    descripcion: $descripcion
    ) {
    _id
  }
}
`;
const EDITAR_OBSERVACION = gql `
mutation editarObservacion($id: String!, $indexObservacion: Int!, $observacion: camposObservacion!){
  editarObservacion(_id: $id, indexObservacion: $indexObservacion, observacion: $observacion) {
    _id
    observaciones {
      _id
      descripcion
    }
  }
}
`;

export { EDITAR_DESCRIPTION, EDITAR_OBSERVACION };