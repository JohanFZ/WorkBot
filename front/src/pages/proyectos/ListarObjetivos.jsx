import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "graphql/proyectos/queries";
import { SpinnerLoading } from "components/Spinner";
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from 'context/userContext';


function ListarObjetivos() {
    const { userData } = useUser();
    const { _id } = useParams();
    const { data, error, loading } = useQuery(GET_PROJECT, {
        variables: { _id },
    });

    useEffect(() => {
        console.log("Data del servidor cargada", data);
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error("Error consultando el proyecto");
            console.log(error);
        }
    }, [error]);

    if (loading) {
        return <SpinnerLoading />;
    }



    return (
        <div className='content-edit'>
            <div className="title">
                <label>Lista de objetivos del proyecto</label>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Presupuesto</th>
                        <th>Objetivos</th>
                        <th>
                            <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                                {
                                    ((userData.rol === "LIDER" && data.ProyectoUnico.lider._id === userData._id) || userData.rol === "ADMINISTRADOR") && (

                                        <Button outline color="primary">
                                            <Link
                                                to={`/proyectos/agregarObjetivo/${_id}`}
                                                style={{ color: "black", textDecoration: "none" }}
                                            >
                                                Agregar Objetivo
                                            </Link>
                                        </Button>
                                    )
                                }
                            </PrivateComponent>
                        </th>
                        <th><Link to='/proyectos'>
                            <i className='fas fa-arrow-left back' />
                        </Link></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.ProyectoUnico.fechaInicio.slice(0, 10)}</td>
                        <td>{data.ProyectoUnico.fechaFin.slice(0, 10)}</td>
                        <td>{data.ProyectoUnico.presupuesto}</td>
                        <td>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Descripcion</th>
                                        <th>Tipo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.ProyectoUnico.objetivos.map((Obje, index) => {
                                            return (<tr key={index}>
                                                <td>{Obje.descripcion}</td>
                                                <td>{Obje.tipo}</td>
                                                <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                                                    {
                                                        ((userData.rol === "LIDER" && data.ProyectoUnico.lider._id === userData._id) || userData.rol === "ADMINISTRADOR") && (

                                                            <Button color="primary">
                                                                <Link
                                                                    to={`/proyectos/editarObjetivos/${data.ProyectoUnico._id}/${index}/${Obje.tipo}/${Obje.descripcion}`}
                                                                    style={{ color: "black", textDecoration: "none" }}
                                                                >
                                                                    Editar
                                                                </Link>
                                                            </Button>
                                                        )
                                                    }
                                                </PrivateComponent>
                                            </tr>)
                                        })
                                    }

                                </tbody>
                            </Table>
                        </td>
                    </tr>

                </tbody>
            </Table>
        </div>
    )
}

export default ListarObjetivos