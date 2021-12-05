import { InscriptionModel } from "./inscripcion";
import {Enum_EstadoInscripcion} from "../enums/enums"

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate("estudiante").populate("proyecto");
      return inscripciones;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {    
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(args.id,
        {
          estado: Enum_EstadoInscripcion.ACEPTADA,
          //fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    rechazarInscripcion: async (parent, args) => {    
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(args.id,
        {
          estado: Enum_EstadoInscripcion.RECHAZADA,
          //fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    }
  },
};

export { resolverInscripciones };