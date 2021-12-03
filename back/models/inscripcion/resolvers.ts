import { InscriptionModel } from "./inscripcion";

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate("estudiante");
      return inscripciones;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        //proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
       inscripcionCreada;
    }
  },
};

export { resolverInscripciones };