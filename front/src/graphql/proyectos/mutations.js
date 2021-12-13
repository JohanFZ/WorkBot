import {gql} from "@apollo/client";

const EDIT_PROJECT = gql`
mutation Mutation($_id: String!, $camposPro: camposProyecto!) {
    modificarProyecto(
      _id: $_id, 
      camposPro:$camposPro) {
      nombre
      estado
      fase
      presupuesto
    }
  }
`;

const EDIT_OBJE = gql`
mutation Mutation($id: String!, $indexObjetivo: Int!, $objetivos: camposObjetivo!) {
  modificarObjetivoProyecto(_id: $id, indexObjetivo: $indexObjetivo, objetivos: $objetivos) {
    _id
    objetivos {
      descripcion
      tipo
    }
  }
}
`;

export {EDIT_PROJECT, EDIT_OBJE};