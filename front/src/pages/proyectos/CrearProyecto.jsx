import React, { useEffect, useState } from 'react';
import InputGlobal from "components/InputGlobal";
import DropDown from 'components/Dropdown';
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { CREATE_PROJECT } from "graphql/proyectos/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { SpinnerLoading } from "components/Spinner";
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormDataObj';
import { Button } from "reactstrap";
import "styles/createObjectiveform.css";
import { nanoid } from "nanoid";
import { ObjContext, useObj } from 'context/objContext';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";


function CrearProyecto() {

    const { userData } = useUser();
    const { form, formData, updateFormData } = useFormData();
    const [users, setUsers] = useState({});
    const [crearProyecto,
        { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PROJECT);
    const {
        data: dataQuery,
        loading: loadingQuery,
        error: errorQuery,
    } = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log(userData.rol, userData.nombre, userData.apellido)
        const usersList = {};
        if (userData.rol === "LIDER") {
            // console.log("entro")
            usersList[userData._id] = userData.nombre + " " + userData.apellido;
            setUsers(usersList);
        } else {

            if (dataQuery) {
                const dataQueryFiltered = dataQuery.Users.filter((user) => {
                    return ((user.rol === "ADMINISTRADOR" || user.rol === "LIDER") && user.estado === "AUTORIZADO")
                });

                // console.log("Datos de la consulta", dataQuery);
                // console.log(dataQueryFiltered);

                dataQueryFiltered.forEach((element) => {
                    usersList[element._id] = element.nombre + " " + element.apellido;
                });
                setUsers(usersList);
            }
        }
    }, [dataQuery]);

    useEffect(() => {

        if (errorQuery) {
            console.log("Error consultando los usuarios", errorQuery);
        }
    }, [errorQuery]);

    if (loadingQuery || mutationLoading) {
        return <SpinnerLoading />
    }

    const submitForm = (event) => {
        event.preventDefault();
        let objeEspe = {};
        objeEspe = Object.values(formData.nested.objetivos).map((obj, index) => {
            if (index === 0) {

                return { descripcion: obj, tipo: "GENERAL" }
            } else {
                return { descripcion: obj, tipo: "ESPECIFICO" }
            }
        });
        formData.presupuesto = parseFloat(formData.presupuesto);
        formData.objetivos = Object.values(Object.assign({ ...objeEspe }));
        formData.estado = "INACTIVO";
        formData.fase = "TERMINADO";
        delete formData.nested;
        // console.log(formData);
        crearProyecto({
            variables: formData,
        });

    };



    return (
        <div className='content-edit'>
            <Link to={`/`}>
                <i className='fas fa-arrow-left back' />
            </Link>
            <h1 className='title'>Crear Proyecto</h1>
            <form
                style={{
                    fontFamily: 'Readex Pro',
                    margin: "auto", display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}
                className='forme'
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
            >
                <div>
                    <InputGlobal
                        name="nombre"
                        label="Nombre proyecto :"
                        required={true}
                        type="text"
                    />

                    <InputGlobal
                        name="presupuesto"
                        label="Presupuesto :"
                        required={true}
                        type="number"
                    />
                </div>

                <div>
                    <InputGlobal
                        name="fechaInicio"
                        label="Fecha de Inicio :"
                        required={true}
                        type="date"
                    />

                    <InputGlobal
                        name="fechaFin"
                        label="Fecha de Fin :"
                        required={true}
                        type="date"
                    />
                </div>

                <div>
                    <DropDown
                        options={users}
                        name="lider"
                        required={true}
                        label="Lider :"
                    />
                </div>

                <span>Objetivos del proyecto</span>

                <div>
                    <InputGlobal
                        name={`nested||objetivos||${nanoid()}||descripcion`}
                        label="Objetivo general :"
                        required={true}
                        type="textarea"

                    />
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}

                >
                    <Objetivos />
                </div>


                <div>
                    <ButtonLoading
                        text="Crear"
                        loading={false}
                        disabled={false}
                    />
                </div>

            </form>
        </div>
    )
};

const Objetivos = () => {

    const [objectiveList, setObjectiveList] = useState([]);
    const [maxObj, setMaxObj] = useState(false);
    const eliminarObjetivo = (id) => {
        // event.preventDefault();
        setObjectiveList(objectiveList.filter((elemento) =>
            elemento.props.id !== id));
        //console.log(objectiveList)
    };

    const addF = (event) => {
        event.preventDefault();
        setObjectiveList([...objectiveList, componenteObjetivoAgregado()]);
    };

    const componenteObjetivoAgregado = () => {
        const id = nanoid();
        //console.log(id);
        return <FormObjetivo key={id} id={id} />;
    };

    useEffect(() => {
        if (objectiveList.length > 4) {
            setMaxObj(true);
        } else {
            setMaxObj(false);
        }
    }, [objectiveList]);

    return (
        <ObjContext.Provider value={{ eliminarObjetivo }}>

            <div>
                {!maxObj && (

                    <Button outline color="success"
                        style={{ marginLeft: "2px" }}
                        onClick={addF}
                        title='Agregar objetivo especifico'
                    >
                        Agregar objetivo especifico
                    </Button>
                )}

                {
                    objectiveList.map((objective) => {
                        return (
                            <>
                                {objective}
                            </>
                        )
                    })
                }
                <br />
            </div>
        </ObjContext.Provider>
    );
};

const FormObjetivo = ({ id }) => {

    const { eliminarObjetivo } = useObj();
    return (
        <div style={{ display: "flex" }} >


            <InputGlobal
                name={`nested||objetivos||${id}||descripcion`}
                label="Descripcion objetivo especifico :"
                type="textarea"
                required={true}
            />


            <Button
                outline color="danger"
                style={{
                    borderRadius: "50%",
                    marginLeft: "2px",
                    with: "30px",
                    height: "40px",
                    marginTop: "24%"

                }}
                title='Eliminar objetivo especifico'
                onClick={() => eliminarObjetivo(id)}
            >
                -
            </Button>
        </div>
    )
};

export default CrearProyecto;
