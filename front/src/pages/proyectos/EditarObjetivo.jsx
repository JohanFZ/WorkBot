import React,{useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import InputGlobal from "components/InputGlobal";
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useMutation } from "@apollo/client";
import { EDIT_OBJE } from 'graphql/proyectos/mutations';
import { SpinnerLoading } from "components/Spinner";
import { toast } from 'react-toastify';

function EditarObjetivo() {
    let { id, indexObjetivo, tipo, descripcion } = useParams();
    indexObjetivo = parseInt(indexObjetivo);
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData(null);
    const [editObje, {
        data: mutationData,
        loading: mutationLoading,
        error: mutationError,
    }] = useMutation(EDIT_OBJE);

    useEffect(() => {
        console.log("Mutacion Edicion", mutationData);
    }, [mutationData]);

    useEffect(() => {
        if(mutationError){
            toast.warning("Error modificando");
        }
        console.log("Error en mutacion", mutationError);
    }, [mutationError]);

    if (mutationLoading) {
        return <SpinnerLoading />;
    }

    const submitForm = (event) =>{
        event.preventDefault();
        // console.log("Datos form", formData);
        editObje({
            variables:{
                id, 
                indexObjetivo, 
                objetivos:{...formData}
            }
        });
        toast.success("Objetivo editado");

    };

    return (
        <div className='content-edit'>
            <Button color="withe" >
                <Link to={`/proyectos/listaObjetivos/${id}`}>
                <i className='fas fa-arrow-left back' />
                </Link>
            </Button>
            <h1 className='title'>Editar Objetivo</h1>
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
                        defaultValue={descripcion}
                        required={true}
                    />

                    <InputGlobal
                        label='Tipo :'
                        type='text'
                        name='tipo'
                        defaultValue={tipo}
                        required={true}
                        readOnly={true}
                    />
                </div>

                <div>
                    <ButtonLoading
                        disabled={false}
                        loading={false}
                        text='Editar'
                    />
                </div>

            </form>
        </div>
    )
}

export default EditarObjetivo
