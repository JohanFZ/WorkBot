import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERPASS } from 'graphql/usuarios/queries';
import InputGlobal from 'components/InputGlobal';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { EDITAR_PASSWORD } from 'graphql/usuarios/mutations';
import { SpinnerLoading } from 'components/Spinner';
import { Button, Collapse, Card } from 'reactstrap';
import bcrypt from 'bcryptjs';
import { EDITAR_DESCRIPTION } from 'graphql/avances/mutations';

const EditarDescripcion = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const [boolean, setBoolean] = useState(false);
  const { _id } = useParams();

  const [editarDescripcion,
    { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_DESCRIPTION);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    editarDescripcion({
      variables: { _id, ...formData }
    })
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Descripción Actualizada");
    }
  }, [mutationData]);

  if (mutationLoading) return <SpinnerLoading />;

  return (
    <div className='content-edit'>
      <Button color="white" onClick={() => { window.location.reload(false) }}>
        <Link to={`/`}>
          <i className='fas fa-arrow-left back' />
        </Link>
      </Button>
      <h1 className='title'>Actualización de la Descripción del Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='form'
      >
        <div>
          <InputGlobal
            label='Descripción :'
            type='textarea'
            name='descripcion'
            required={true}
          />
        </div>
        <div >
          <Button outline color="primary">
            Actualizar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditarDescripcion;