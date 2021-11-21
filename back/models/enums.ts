//Enums User

enum Enum_Rol {
  estudiante = "Estudiante",
  lider = "Líder",
  administrador = "Administrador",
}

enum Enum_EstadoUsuario {
  pendiente = "Pendiente",
  autorizado = "Autorizado",
  noAutorizado = "No Autorizado"
}

 enum Enum_EstadoInscripcion {
   aceptada = 'aceptada',
   rechazada = 'rechazada',
 }

export {
  Enum_Rol,
  Enum_EstadoUsuario,
  Enum_EstadoInscripcion,
}