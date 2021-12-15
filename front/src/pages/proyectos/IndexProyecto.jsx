import React, { useEffect, useReducer } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "graphql/proyectos/queries";
import { SpinnerLoading } from "components/Spinner";
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";
import PrivateComponent from "components/PrivateComponent";


function IndexProyecto() {

   
    const { data, error, loading } = useQuery(GET_PROJECTS);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();
        console.log("Data del servidor cargada", data);
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los proyectos");
            console.log(error);
        }
    }, [error]);

    if (loading) {
        return <SpinnerLoading />;
    }
    
    return (
        <div>
            
            <div className="title">
                <label>Lista de proyectos</label>
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.Proyecto.map((project,index) => {
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
                                            style={{color: "black", textDecoration:"none"}}
                                            >
                                                Ver detalle
                                            </Link>
                                        </Button>
                                    </td>
                                    <td>
                                        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                                        <Button outline color="primary">
                                            <Link 
                                            to={`/proyectos/editar/${project._id}`}
                                            style={{color: "black", textDecoration:"none"}}
                                            >
                                                Editar
                                            </Link>
                                        </Button>
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
