import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import InputGlobal from "components/InputGlobal";
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useMutation } from "@apollo/client";
import { ADD_OBJECTIVE } from "graphql/proyectos/mutations";
import { SpinnerLoading } from "components/Spinner";
import { Enum_TipoObjetivo } from "utils/enum"
import { toast } from 'react-toastify';


function AgregarObjetivo() {
    const { id } = useParams();
    const { form, formData, updateFormData } = useFormData(null);
    const [addObjective, {
        data: mutationData,
        loading: mutationLoading,
        error: mutationError,
    }] = useMutation(ADD_OBJECTIVE);
    //onClick={() =>{window.location.reload(false)}}

    useEffect(() => {
        console.log("Mutacion Edicion", mutationData);
    }, [mutationData]);

    useEffect(() => {
        console.log("Error en mutacion", mutationError);
    }, [mutationError]);

    if (mutationLoading) {
        return <SpinnerLoading />;
    }

    const submitForm = (event) => {
        event.preventDefault();
        console.log("Datos formulario", formData);
        addObjective({
            variables: {
                id,
                campos: {
                    descripcion: formData.descripcion,
                    tipo: Enum_TipoObjetivo.ESPECIFICO,
                }
            }
        });
        toast.success("Objetivo agregado");
    };

    return (
        <div className='content-edit'>
            <Button color="withe">
                <Link to={`/proyectos/listaObjetivos/${id}`}>
                    <i className='fas fa-arrow-left back' />
                </Link>
            </Button>
            <h1 className='title'>Agregar objetivo especifico</h1>

            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='form'
            >
                <div>
                    <InputGlobal
                        label="Descripcion :"
                        type="textarea"
                        name="descripcion"
                        required={true}
                    />
                </div>

                <div>
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Agregar'
                    />
                </div>
            </form>
        </div>
    )
}

export default AgregarObjetivo
