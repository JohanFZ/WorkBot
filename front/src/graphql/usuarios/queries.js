import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
query {
  Users {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  },
}
` ;

const GET_USUARIO = gql`
query User($_id: String!)  {
  User(_id: $_id) {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  }
}
` ;

const GET_USERPASS = gql`
query UserPass($_id: String!)  {
  UserPass(_id: $_id) {
    _id
    password
  }
}
` ;

export { GET_USUARIOS, GET_USUARIO, GET_USERPASS };