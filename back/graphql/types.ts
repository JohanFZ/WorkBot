import { gql } from "apollo-server-express";
import { typesEnums } from "../models/enums/types";
import { typesUser } from "../models/users/types";
import { typesInscripcion } from "../models/inscripcion/types";
import { typesProyect } from "../models/projects/types";
import { typesAdvancements } from "../models/advances/types";

const typesGlobals = gql`

  scalar Date

`;

export const types = [
  typesGlobals,
  typesUser,
  typesEnums,
  typesProyect,
  typesInscripcion,
  typesAdvancements
];