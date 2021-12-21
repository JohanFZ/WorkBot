import { advancementModel } from "./advance";

const resolversAdvancement = {
  Query: {
    Advancements: async (parent, args) => {
      const advancements = await advancementModel.find().populate('creadoPor').populate('proyecto');
      return advancements;
    },
    Advancement: async (parent, args) => {
      const advancement = await advancementModel.findOne({ _id: args._id }).populate('creadoPor').populate('proyecto');
      return advancement;
    },
    AdvancesProject: async (parent, args) => {
      const proyectos = await advancementModel.find({
        proyecto: args.proyecto
      }).populate("creadoPor").populate({ path: "proyecto", populate: { path: "lider" } });
        return proyectos;
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

    eliminarAvance: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const avanceEliminado = await advancementModel.findByIdAndDelete({ _id: args._id })
        return avanceEliminado;
      }
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await advancementModel.findByIdAndUpdate(args._id, {
        descripcion: args.descripcion,
      },
        { new: true }
      );

      return avanceEditado;
    },
  }
}

export { resolversAdvancement };