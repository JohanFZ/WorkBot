import { UserModel } from '../../models/users/user';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils'

const resolversAuth = {
  Mutation: {
    registro: async (parent, args) => {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });
      console.log("usuario creado", usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEncontrado = await UserModel.findOne({ correo: args.correo });
      if(!usuarioEncontrado) {
        return {
          error : "El usuario no existe",
        }
      } else {
        if(usuarioEncontrado.estado === "PENDIENTE"){
          return {
            error : "Su cuenta esta en estado pendiente",
          }
        }
        if (usuarioEncontrado.estado === "NO_AUTORIZADO") {
          return {
            error: "Su cuenta no esta autorizada",
          }
        }
        else if (usuarioEncontrado.estado === "AUTORIZADO") {
          if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
            return {
              token: generateToken({
                _id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                identificacion: usuarioEncontrado.identificacion,
                correo: usuarioEncontrado.correo,
                rol: usuarioEncontrado.rol,
              }),
            };
          } else {
            return {
              error: "Contraseña incorrecta",
            }
          }
        }
      }
    },

    validateToken: async (parent, args, context) => {
      console.log("contexto", context);
      //validar que el contexto tenga info del usuario. si sí, refrescar el token
      if (!context.userData) {
        return {
          error: 'Token no valido',
        }
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
          }),
        };
      }
    }
  }
}

export { resolversAuth };