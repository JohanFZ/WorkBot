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

const GET_INSCRIPCIONESPROYECTOS = gql`
query InscripcionesProyectos($estudiante: String) {
    InscripcionesProyectos(estudiante: $estudiante) {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
        fechaInicio
        fechaFin
        estado
        fase
        presupuesto
        objetivos {
          descripcion
          tipo
        }
        lider {
          _id
          nombre
          apellido
          correo
        }
      }
    }
  }
`;


export { GET_INSCRIPCIONES, GET_INSCRIPCIONESPROYECTOS };