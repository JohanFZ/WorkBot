import { Schema, model } from "mongoose";
import { ProjectModel } from "../projects/project";
import { UserModel } from "../users/user";

interface Advance {
  proyecto: Schema.Types.ObjectId,
  fecha: Date,
  descripcion: string,
  observaciones: [string],
  creadoPor: Schema.Types.ObjectId
}

const advancementSchema = new Schema<Advance>({
  fecha: {
    type: Date,
    required: true
  },
  descripcion:{
    type: String,
    required: true
  },
  observaciones: [
    {
    type: String,
    }
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  }
})

const advancementModel = model("Advance", advancementSchema);

export { advancementModel };