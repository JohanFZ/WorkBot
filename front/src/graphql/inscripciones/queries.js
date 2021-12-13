import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query Inscripciones {
    Inscripciones {
      _id
      estado
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
      estudiante {
        _id
        nombre
        correo
        apellido
      }
      fechaIngreso
      fechaEgreso
    }
  }
`;

export { GET_INSCRIPCIONES };