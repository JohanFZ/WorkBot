import React, { useEffect, useReducer } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "graphql/proyectos/queries";
import { SpinnerLoading } from "components/Spinner";
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones'
import PrivateComponent from "components/PrivateComponent";
import { useUser } from 'context/userContext';


function IndexProyecto() {
    const { userData } = useUser();

    const { data, error, loading } = useQuery(GET_PROJECTS);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [crearInscripcion,
        { data: dataMutatationCrear,
            loading: loadingMutatationCrear,
            error: errorMutatationCrear }] = useMutation(CREAR_INSCRIPCION);

    useEffect(() => {
        forceUpdate();
        console.log("Data del servidor cargada", data);
    }, [data]);

    useEffect(() => {
        if(dataMutatationCrear){
            toast.success("Inscripción Solicitada");
            console.log("dataMutatationCrear: ",dataMutatationCrear)
        }
    }, dataMutatationCrear);

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los proyectos");
            console.log(error);
        }
        if (errorMutatationCrear) {
            toast.error("Error en la inscripcion");
            console.log(errorMutatationCrear);
        }
    }, [error, errorMutatationCrear]);

    if (loading || loadingMutatationCrear) {
        return <SpinnerLoading />;
    }


    const solicitarInscripcion = (proyecto, estudiante) => {
        crearInscripcion({
            variables: {
                proyecto: proyecto,
                estudiante: estudiante,
                estado: "PENDIENTE",
            },
        });
    };


    return (
        <div className='content-edit'>
            <Link to={`/`}>
                <i className='fas fa-arrow-left back' />
            </Link>
            <div className="title">
                <label>Lista de Proyectos</label>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Lider</th>
                        <th>Rol Lider</th>
                        <th>Correo Lider</th>
                        <th>Fase</th>
                        <th>Estado</th>
                        <th>Objetivos</th>
                        <PrivateComponent roleList={"ESTUDIANTE"}>
                            <th>Inscripcion</th>
                        </PrivateComponent>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.Proyecto.map((project, index) => {
                            return (
                                <tr key={index}>
                                    <td>{project.nombre}</td>
                                    <td>{project.lider.nombre + " " + project.lider.apellido}</td>
                                    <td>{project.lider.rol}</td>
                                    <td>{project.lider.correo}</td>
                                    <td>{project.fase}</td>
                                    <td>{project.estado}</td>
                                    <td>
                                        <Button outline color="primary">
                                            <Link
                                                to={`/proyectos/listaObjetivos/${project._id}`}
                                                style={{ color: "black", textDecoration: "none" }}
                                            >
                                                Ver detalle
                                            </Link>
                                        </Button>
                                    </td>
                                    <td>
                                        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                                            {
                                                ((userData.rol === "LIDER" && project.lider._id === userData._id) || userData.rol === "ADMINISTRADOR") && (

                                                    <Button outline color="primary">
                                                        <Link
                                                            to={`/proyectos/editar/${project._id}`}
                                                            style={{ color: "black", textDecoration: "none" }}
                                                        >
                                                            Editar
                                                        </Link>
                                                    </Button>
                                                )
                                            }
                                        </PrivateComponent>
                                        <PrivateComponent roleList={"ESTUDIANTE"}>
                                            {
                                                ( project.estado === "ACTIVO") && (
                                                    <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    title="Inscripción"
                                                    onClick={() => {
                                                        solicitarInscripcion(project._id, userData._id)
                                                    }}
                                                >Inscribirme</button>
                                                )


                                            }
                                        </PrivateComponent>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default IndexProyecto
