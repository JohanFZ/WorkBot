import { resolversUser } from "../models/users/resolvers";
import { resolverInscripciones } from "../models/inscripcion/resolvers";

export const resolvers = [
    resolversUser,
    resolverInscripciones
];