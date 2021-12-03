import { gql } from "apollo-server-express";

const typesProyect = gql`

scalar Date

type Objetivo{
    _id: ID!
    descripcion: String!
    tipo:Enum_TipoObjetivo!
}

input crearObjetivo{
    descripcion: String!
    tipo:Enum_TipoObjetivo!
}

input camposProyecto{
    nombre: String
    presupuesto: Float
    estado: Enum_EstadoProyecto
    fase:Enum_FaseProyecto
}

input camposObjetivo{
    descripcion: String!
    tipo:Enum_TipoObjetivo!
}

type Proyecto{
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase:Enum_FaseProyecto!
    lider: User!
    objetivos: [Objetivo]

}


type Query {
    Proyecto:[Proyecto]
    ProyectosLiderados(lider: String):[Proyecto]
}

type Mutation{

    crearProyecto(
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase:Enum_FaseProyecto!
        lider: String!
        objetivos:[crearObjetivo]
    ):Proyecto
    
    modificarProyecto(
        _id: String!
        camposPro: camposProyecto!
    ):Proyecto

    modificarObjetivoProyecto(
        _id: String!
        indexObjetivo: Int!
        objetivos:camposObjetivo!
    ):Proyecto

    crearObjetivos(
        _id: String!
        campos:camposObjetivo!
    ):Proyecto

    
}
`;

export { typesProyect };