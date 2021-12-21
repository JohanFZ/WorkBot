import { gql } from '@apollo/client';

const GET_AVANCES = gql`
query AdvancesProject($proyecto: String) {
    AdvancesProject(proyecto : $proyecto) {
      _id
      descripcion
      fecha
      observaciones{
        descripcion
      }
      creadoPor {
        _id
        nombre
        apellido
        correo
      }
    }
  }
`;


export { GET_AVANCES };