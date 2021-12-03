import { ProjectModel } from "./project";

const resolversProyect = {

    Query: {
        Proyecto: async (parent, args) => {
            const proyectos = await ProjectModel.find().populate("lider");
            return proyectos;
        },

    },

    Mutation: {
        crearProyecto:async(parent, args) =>{
            const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                estado: args.estado,
                presupuesto: args.presupuesto,
                fase: args.fase,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                objetivos: args.objetivos,
                lider: args.lider,
            });
            return proyectoCreado;
        },
    }
};

export { resolversProyect };