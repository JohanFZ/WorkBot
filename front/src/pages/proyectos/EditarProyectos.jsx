import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import InputGlobal from "components/InputGlobal";
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { SpinnerLoading } from "components/Spinner";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTEDIT } from "graphql/proyectos/queries";
import { EDIT_PROJECT } from 'graphql/proyectos/mutations';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enum";


function EditarProyectos() {
    let navigate = useNavigate();
    const { _id } = useParams();
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_PROJECTEDIT, {
        variables: { _id }
    });
    const { form, formData, updateFormData } = useFormData(null);
    const [editPro,
        {
            data: mutationData,
            loading: mutationLoading,
            error: mutationError
        }] = useMutation(EDIT_PROJECT);

    // useEffect(() => {

    //     console.log("Data del servidor cargada", queryData);
    // }, [queryData]);

    useEffect(() => {
        if (queryError) {
            toast.error("Error consultando el proyecto");
            console.log(queryError);
        }
    }, [queryError]);

    useEffect(() => {
        console.log("Mutacion Edicion", mutationData);
    }, [mutationData]);

    if (queryLoading || mutationLoading) {
        return <SpinnerLoading />;
    }

    const submitForm = (event) => {
        event.preventDefault();
        // console.log("Datos form", formData);
        formData.presupuesto = parseFloat(formData.presupuesto);
        editPro({
            variables: { _id, camposPro: { ...formData } }
        });
        toast.success("Proyecto editado");
        // navigate("/proyectos");
        
    };


    return (
        <div className='content-edit'>
            <Button color="withe"onClick={() =>{window.location.reload(false)}}>
                <Link to={`/proyectos`}>
                <i className='fas fa-arrow-left back' />
                </Link>
            </Button>
            <h1 className='title'>Editar Proyecto</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='form'
            >
                <div>
                    <InputGlobal
                        label="Nombre:"
                        type="text"
                        name="nombre"
                        defaultValue={queryData.ProyectoUnico.nombre}
                        required={true}
                    />

                    <InputGlobal
                        label="Presupuesto:"
                        type="text"
                        name="presupuesto"
                        defaultValue={queryData.ProyectoUnico.presupuesto}
                        required={true}
                    />
                </div>
                <div>

                    <DropDown
                        label='Estado :'
                        name='estado'
                        defaultValue={queryData.ProyectoUnico.estado}
                        required={true}
                        options={Enum_EstadoProyecto}
                    />
                    <DropDown
                        label='Fase :'
                        name='fase'
                        defaultValue={queryData.ProyectoUnico.fase}
                        required={true}
                        options={Enum_FaseProyecto}
                    />
                </div>
                <div>
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Editar'
                    />
                </div>

            </form>
        </div >
    )
}

export default EditarProyectos
