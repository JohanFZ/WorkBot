import { advancementModel } from "./advance";

const resolversAdvancement = {
  Query: {
    Advancements: async (parent, args) => {
      const advancements = await advancementModel.find().populate('creadoPor').populate('proyecto');
      return advancements;
    },
  },

  Mutation: {
    crearAvance: async (parent, args) => {
      const avanceCreado = await advancementModel.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        observaciones: args.observaciones,
        creadoPor: args.creadoPor,
        proyecto: args.proyecto
      });

      return avanceCreado;
    },
  }
}

export { resolversAdvancement };