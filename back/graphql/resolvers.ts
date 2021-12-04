import { resolversUser } from "../models/users/resolvers";
import { resolverInscripciones } from "../models/inscripcion/resolvers";
import { resolversProyect } from "../models/projects/resolvers";
import { resolversAdvancement } from "../models/advances/resolvers";

export const resolvers = [
    resolversUser,
    resolversProyect,
    resolverInscripciones,
    resolversAdvancement
];