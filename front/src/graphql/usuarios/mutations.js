import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
  editarUsuario(
    _id: $_id
    nombre: $nombre
    apellido: $apellido
    identificacion: $identificacion
    correo: $correo
    estado: $estado
    ) {
    _id
    nombre
    apellido
    identificacion
    correo
    estado
  }
}
`;

const EDITAR_PASSWORD = gql`
  mutation EditarPassword(
    $_id: String!
    $password: String!
  ) {
  editarPassword(
    _id: $_id
    password: $password
    ) {
    _id
  }
}
`;

export { EDITAR_USUARIO, EDITAR_PASSWORD };