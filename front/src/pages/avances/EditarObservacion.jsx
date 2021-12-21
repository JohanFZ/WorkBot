import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import InputGlobal from "components/InputGlobal";
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useMutation } from "@apollo/client";
import { EDITAR_OBSERVACION } from 'graphql/avances/mutations';
import { SpinnerLoading } from "components/Spinner";
import { Enum_TipoObjetivo } from "utils/enum"
import { toast } from 'react-toastify';

function EditarObservacion() {
    const { id, observacion, indexObservacion } = useParams();
    const indexO = parseInt(indexObservacion);
    const { form, formData, updateFormData } = useFormData(null);
    const [addObservacion, {
        data: mutationData,
        loading: mutationLoading,
        error: mutationError,
    }] = useMutation(EDITAR_OBSERVACION);
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
        // console.log("Datos formulario", formData);
        addObservacion({
            variables: {
                id,
                indexObservacion: indexO,
                observacion: {
                    descripcion: formData.observacion,
                }
            }
        });
        toast.success("Observacion modificada");
    };

    return (
        <div className='content-edit'>
            <Button color="withe">
                <Link to={`/`}>
                    <i className='fas fa-arrow-left back' />
                </Link>
            </Button>
            <h1 className='title'>Editar Observación</h1>

            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='form'
            >
                <div>
                    <InputGlobal
                        label="Observacion :"
                        type="textarea"
                        name="observacion"
                        required={true}
                        defaultValue={observacion}
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
        </div>
    )
}

export default EditarObservacion
