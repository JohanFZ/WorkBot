import { InscriptionModel } from "./inscripcion";
import {Enum_EstadoInscripcion} from "../enums/enums"

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate("estudiante").populate("proyecto");
      return inscripciones;
    },
    InscripcionesProyectos: async (parent, args) => {
      const proyectos = await InscriptionModel.find({
        estudiante: args.estudiante
      }).populate("estudiante").populate({path: "proyecto", populate : {path: "lider"}});
      return proyectos;
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
          fechaIngreso: new Date,
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    rechazarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(args.id,
        {
          estado: Enum_EstadoInscripcion.RECHAZADA,
          fechaIngreso: new Date,
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    culminarInscripcion: async (parent, args) => {
      const inscripcionFinalizada = await InscriptionModel.updateMany(
        {
          proyecto:args.proyecto
        },
        {
          fechaEgreso: new Date,
        },
        { new: true }
      );
      return inscripcionFinalizada;
    },
  },
};

export { resolverInscripciones };