import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
query Proyecto{
    Proyecto {
        _id
      nombre
      lider {
        nombre
        apellido
        rol
        correo
      }
      presupuesto
      fase
      estado
      fechaInicio
      fechaFin
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;

const GET_PROJECT = gql`
query Proyecto($_id: String!){
  ProyectoUnico(id: $_id) {
    _id
    fechaInicio
    fechaFin
    presupuesto
    objetivos {
      descripcion
      tipo
    }
  }
}
`;

const GET_PROJECTEDIT = gql`
query Proyecto($_id: String!){
  ProyectoUnico(id: $_id) {
    nombre
    presupuesto
    estado
    fase
  }
}
`;

const GET_PROJECTEDITOBJE = gql`
query Proyecto($_id: String!){
  ProyectoUnico(id: $_id) {
    _id
    objetivos{
      descripcion
      tipo
    }
  }
}
`;

const GET_PROJECTSLED = gql`
query ProyectosLiderados($lider: String){
    ProyectosLiderados(lider: $lider) {
        _id
      nombre
      presupuesto
      fase
      estado
      fechaInicio
      fechaFin
      lider {
        nombre
        apellido
        rol
        correo
      }
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;


export { GET_PROJECTS, GET_PROJECT, GET_PROJECTEDIT, GET_PROJECTEDITOBJE, GET_PROJECTSLED  };