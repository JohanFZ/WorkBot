//Enums User

enum Enum_Rol {
  ESTUDIANTE = "ESTUDIANTE",
  LIDER = "LIDER",
  ADMINISTRADOR = "ADMINISTRADOR"
}


enum Enum_EstadoUsuario {
  PENDIENTE = "PENDIENTE",
  AUTORIZADO = "AUTORIZADO",
  NO_AUTORIZADO = "NO_AUTORIZADO",
}

//Enums Proyect

enum Enum_EstadoProyecto {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO"
}

enum Enum_FaseProyecto {
  INICIADO = "INICIADO",
  DESARROLLO = "DESARROLLO",
  TERMINADO = "TERMINADO",
  NULO = ""
}

//Enums Objective

enum Enum_TipoObjetivo {
  GENERAL = "GENERAL",
  ESPECIFICO = "ESPECIFICO"
}

//Enums Inscripcion

enum Enum_EstadoInscripcion {
  ACEPTADA = "ACEPTADA",
  RECHAZADA = "RECHAZADA",
  PENDIENTE = "PENDIENTE",
}

export {
  Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto,
  Enum_FaseProyecto, Enum_TipoObjetivo, Enum_EstadoInscripcion
}