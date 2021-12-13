import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO, GET_USERPASS } from 'graphql/usuarios/queries';
import InputGlobal from 'components/InputGlobal';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';
import { SpinnerLoading } from 'components/Spinner';
import { Button, Collapse, Card } from 'reactstrap';
import bcrypt from 'bcryptjs';

const Perfil = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const [boolean, setBoolean] = useState(true);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery(GET_USUARIO, {
    variables: { _id }
  });

  const {
    data: queryDataPass,
    error: queryErrorPass,
    loading: queryLoadingPass
  } = useQuery(GET_USERPASS, {
    variables: { _id }
  });

  const [editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    // console.log("fd", formData);
    editarUsuario({
      variables: { _id, ...formData }
    })
  };

  const submitFormPass = (e) => {
    e.preventDefault();
    const pass = e.target[0].value;
    if(bcrypt.compareSync(pass, queryDataPass.UserPass.password)){
      console.log("Esta correcta");
    }else {
      toast.error("La contraseña actual no coincide.");
    }
    // editarUsuario({
    //   variables: { _id, ...formData }
    // })
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario Actualizado");
    }
  }, [mutationData]);

  useEffect(() => {
    if (queryDataPass) {
      console.log("pass", queryDataPass);
    }
  }, [queryDataPass]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el usuario");
    }
    if (mutationError) {
      toast.error("Error actualizando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading || queryLoadingPass || mutationLoading) return <SpinnerLoading />;

  return (
    <div className='content-edit'>
      <Link to='/home'>
        <i className='fas fa-arrow-left back' />
      </Link>
      <div className='opciones'>
        <Button className='button' disabled={boolean === true} color='primary' onClick={() => setBoolean(!boolean)}>
          Datos Personales
        </Button>
        <Button className='button' disabled={boolean === false} color='primary' onClick={() => setBoolean(!boolean)}>
          Cambio de Contraseña
        </Button>
      </div>
      <Collapse isOpen={boolean === false ? false : true}>
        <Card>
          <h1 className='title'>Editar Datos Personales</h1>
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
              />
              <InputGlobal
                label='Apellido :'
                type='text'
                name='apellido'
                defaultValue={queryData.User.apellido}
                required={true}
              />
            </div>
            <div>
              <InputGlobal
                label='Correo :'
                type='email'
                name='correo'
                defaultValue={queryData.User.correo}
                required={true}
              />
              <InputGlobal
                label='Identificación :'
                type='text'
                name='identificacion'
                defaultValue={queryData.User.identificacion}
                required={true}
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
            <div className='content-button'>
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text='Confirmar'
              />
            </div>
          </form>
        </Card>
      </Collapse>
      <Collapse isOpen={boolean === false ? true : false}>
        <Card>
          <h1 className='title'>Cambio de Contraseña</h1>
          <form
            onSubmit={submitFormPass}
            onChange={updateFormData}
            ref={form}
            className='form'
          >
            <div>
              <InputGlobal
                label='Contraseña Actual :'
                type='password'
                name='passworda'
                required={true}
              />
              <InputGlobal
                label='Contraseña Nueva :'
                type='password'
                name='password'
                required={true}
              />
            </div>
            <div className='content-button'>
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text='Actualizar'
              />
            </div>
          </form>
        </Card>
      </Collapse>
    </div>
  )
}

export default Perfil;