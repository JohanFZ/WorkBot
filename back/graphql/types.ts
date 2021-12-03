import { gql } from "apollo-server-express";
import { typesEnums } from "../models/enums/types";
import { typesUser } from "../models/users/types";
import { typesProyect } from "../models/projects/types"

const typesGlobals = gql`

  scalar Date

`;

export const types = [typesGlobals, typesUser, typesEnums, typesProyect];