import { UserModel } from "./user";

const resolversUser = {
  Query: {
    Users: async (parent, args) => {
      const users = await UserModel.find();
      return users;
    },
  },

  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },

    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findByIdAndDelete({ _id: args._id })
        return usuarioEliminado;
      } else {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo })
        return usuarioEliminado;
      }
    },

    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado
      });
    },
  }
}

export { resolversUser };