import { gql } from "apollo-server-express";
import { typesEnums } from "../models/enums/types";
import { typesUser } from "../models/users/types";
import { typesInscripcion } from "../models/inscripcion/types";

const typesGlobals = gql`

  scalar Date

`;

export const types = [
  typesGlobals, 
  typesUser, 
  typesEnums,
  typesInscripcion
];