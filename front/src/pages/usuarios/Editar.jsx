import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import InputGlobal from 'components/InputGlobal';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';
import { SpinnerLoading } from 'components/Spinner';

const EditarUsuario = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery(GET_USUARIO, {
    variables: { _id }
  });

  const [editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    editarUsuario({
      variables: { _id, ...formData }
    })
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario Actualizado");
    }
  }, [mutationData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el usuario");
    }
    if (mutationError) {
      toast.error("Error actualizando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading || mutationLoading) return <SpinnerLoading />;

  return (
    <div className='content-edit'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left back' />
      </Link>
      <h1 className='title'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='form'
      >
        <div>
        <InputGlobal
          label='Nombre :'
          type='text'
          name='nombre'
          defaultValue={queryData.User.nombre}
          required={true}
          readOnly={true}
        />
        <InputGlobal
          label='Apellido :'
          type='text'
          name='apellido'
          defaultValue={queryData.User.apellido}
          required={true}
          readOnly={true}
        />
        </div>
        <div>
          <InputGlobal
            label='Correo :'
            type='email'
            name='correo'
            defaultValue={queryData.User.correo}
            required={true}
            readOnly={true}
          />
          <InputGlobal
            label='Identificación :'
            type='text'
            name='identificacion'
            defaultValue={queryData.User.identificacion}
            required={true}
            readOnly={true}
          />
        </div>
        <div>
          <DropDown
            label='Estado :'
            name='estado'
            defaultValue={queryData.User.estado}
            required={true}
            options={Enum_EstadoUsuario}
          />
        </div>
        <div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Confirmar'
          />
        </div>
      </form>
    </div>
  )
}

export default EditarUsuario;
