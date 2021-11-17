import { connect } from "mongoose";

const conectarBD = async () => {
  return await connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Conexion exitosa");
    })
    .catch((e) => {
      console.error("Error de la base de datos", e);
    })
}

export default conectarBD;