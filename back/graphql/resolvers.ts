import { resolversUser } from "../models/users/resolvers";
import { resolverInscripciones } from "../models/inscripcion/resolvers";
import { resolversProyect } from "../models/projects/resolvers";

export const resolvers = [
    resolversUser,
    resolversProyect,
    resolverInscripciones
];