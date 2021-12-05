import { ProjectModel } from "./project";

const resolversProyect = {

    Query: {
        Proyecto: async (parent, args) => {
            const proyectos = await ProjectModel.find().populate("lider");
            return proyectos;
        },
        ProyectosLiderados: async (parent, args) => {
            const proyectos = await ProjectModel.find({
                lider: args.lider
            }).populate("lider");
            return proyectos;
        },

    },

    Mutation: {
        crearProyecto: async (parent, args) => {
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
        crearObjetivos: async (parent, args) => {
            const adicionObjetivos = await ProjectModel.findByIdAndUpdate(args._id, {
                $addToSet: {
                    objetivos: {
                        ...args.campos
                    }
                }
            }, { new: true });
            return adicionObjetivos;
        },
        modificarProyecto: async (parent, args) => {
            const modificarProyecto = await ProjectModel.findByIdAndUpdate(
                args._id,
                {
                    ...args.camposPro
                },
                { new: true });
            return modificarProyecto
        },
        modificarObjetivoProyecto: async (parent, args) => {
            const modificarProyecto = await ProjectModel.findByIdAndUpdate(
                args._id,
                {
                    $set: {
                        [`objetivos.${args.indexObjetivo}.descripcion`]: args.objetivos.descripcion,
                        [`objetivos.${args.indexObjetivo}.tipo`]: args.objetivos.tipo,
                    }
                },
                { new: true });
            return modificarProyecto
        },
    }
};

export { resolversProyect };