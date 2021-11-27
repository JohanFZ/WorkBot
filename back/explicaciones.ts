import conectarBD from "./db/db";
import { Enum_Rol } from "./models/enums/enums";
import { UserModel } from "./models/users/user";
import dotenv from 'dotenv'; //manejar variables de entorno

dotenv.config();

const crearUsuario = async () => {
  await UserModel.create({
    correo: "johanfore67@gmail.com",
    identificacion: "1007445878",
    nombre: "Johan",
    apellido: "Orozco",
    rol: Enum_Rol.administrador,
  })
    .then(u => {
      console.log("Usuario Creado", u);
    })
    .catch((e) => {
      console.error("Error al crear el usuario", e);
    });
}

const editarUsuario = async () => {
  await UserModel.findOneAndUpdate({ correo: "johanfore67@gmail.com" }, {
    nombre: 'Alexander',
    apellido: 'Orozco'
  })
    .then((u) => {
      console.log("Usuario Actualizado", u);
    })
    .catch((e) => {
      console.error("Error al actualizar el usuario", e);
    })
}

const eliminarUsuario = async () => {
  await UserModel.findOneAndDelete({ correo: 'johanfore67@gmail.com' })
    .then((u) => {
      console.log("Usuario Eliminado", u);
    })
    .catch((e) => {
      console.error("Usuario no Eliminado", e);
    })
}

const obtenerUsuarios = async () => {
  await UserModel.find()
    .then((u) => {
      console.log("usuarios", u);
    })
    .catch((e) => {
      console.error("Error obteniendo los usuarios", e);
    })
}

const obtenerUsuario = async () => {
  await UserModel.findOne({ correo: 'johanfore67@gmail.com' })
    .then((u) => {
      console.log("Usuario Encontrado", u);
    })
    .catch((e) => {
      console.error("Error en la busqueda", e);
    })
}

const main = async () => {
  await conectarBD();

  // crearUsuario();
}

main();