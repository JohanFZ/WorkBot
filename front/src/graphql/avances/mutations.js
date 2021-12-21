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

export { EDITAR_DESCRIPTION };