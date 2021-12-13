import { UserModel } from "./user";
import bcrypt from 'bcrypt';

const resolversUser = {
  Query: {
    Users: async (parent, args) => {
      const users = await UserModel.find();
      return users;
    },
    User: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id });
      return user;
    },
    UserPass: async (parent, args) => {
      const userPass = await UserModel.findOne({ _id: args._id });
      return userPass;
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
        estado: args.estado
      },
        { new: true }
      );

      return usuarioEditado;
    },

    editarPassword: async (parent, args) => {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
        password: hashedPassword,
      },
        { new: true }
      );
      return usuarioEditado;
    },
  }
}

export { resolversUser };