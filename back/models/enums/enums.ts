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

//Project Enums

enum Enum_EstadoProyecto{
  activo = "Activo",
  inactivo = "Inactivo",
};

enum Enum_FaseProyecto{
  iniciado = "Iniciado",
  desarrollo = "Desarrollo",
  terminado = "Terminado",
  nula = "",
};

enum Enum_TipoObjetivo{
  general = "General", 
  especifico = "Especifico",
};

export {
  Enum_Rol,
  Enum_EstadoUsuario,
  Enum_EstadoInscripcion,
  Enum_EstadoProyecto,
  Enum_FaseProyecto,
  Enum_TipoObjetivo,
}