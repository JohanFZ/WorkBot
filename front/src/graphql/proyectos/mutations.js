import { gql } from "@apollo/client";

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

const ADD_OBJECTIVE = gql`
mutation crearObjetivos($id: String!, $campos: camposObjetivo!) {
  crearObjetivos(_id: $id, campos: $campos) {
    _id
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

const CREATE_PROJECT = gql`
mutation Mutation(
  $nombre: String!,
  $presupuesto: Float!,
  $fechaInicio: Date!,
  $fechaFin: Date!,
  $estado: Enum_EstadoProyecto!,
  $fase: Enum_FaseProyecto!,
  $lider: String!,
  $objetivos: [crearObjetivo]
  ) {
  crearProyecto(
    nombre: $nombre,
    presupuesto: $presupuesto,
    fechaInicio: $fechaInicio,
    fechaFin: $fechaFin, 
    estado: $estado, 
    fase: $fase,
    lider: $lider, 
    objetivos: $objetivos
    ) {
  _id
  nombre
  estado
  fase  
  }
}
`;

export { EDIT_PROJECT, EDIT_OBJE, ADD_OBJECTIVE, CREATE_PROJECT };