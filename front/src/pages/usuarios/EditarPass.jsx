import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERPASS } from 'graphql/usuarios/queries';
import InputGlobal from 'components/InputGlobal';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { EDITAR_PASSWORD } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';
import { SpinnerLoading } from 'components/Spinner';
import { Button, Collapse, Card } from 'reactstrap';
import bcrypt from 'bcryptjs';

const EditarPass = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const [boolean, setBoolean] = useState(false);
  const { _id } = useParams();

  const {
    data: queryDataPass,
    error: queryErrorPass,
    loading: queryLoadingPass
  } = useQuery(GET_USERPASS, {
    variables: { _id }
  });

  const [editarPassword,
    { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PASSWORD);

  const submitFormPass = (e) => {
    e.preventDefault();
    const pass = e.target[0].value;
    if (bcrypt.compareSync(pass, queryDataPass.UserPass.password)) {
      editarPassword({
        variables: { _id, ...formData }
      })
    } else {
      toast.error("La contraseña actual no coincide.");
    }
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Contraseña Actualizada");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error actualizando la contraseña.");
    }
  }, [mutationError]);

  if (queryLoadingPass) return <SpinnerLoading />;

  return (
    <div className='content-edit'>
      <Link to={`/profile/${_id}`}>
        <i className='fas fa-arrow-left back' />
      </Link>
      <div className='opciones'>
        <Link to={`/profile/${_id}`}>
          <Button className='button' disabled={boolean === true} color='primary' onClick={() => setBoolean(!boolean)}>
            Datos Personales
          </Button>
        </Link>
          <Button className='button' disabled={boolean === false} color='primary' onClick={() => setBoolean(!boolean)}>
            Cambio de Contraseña
          </Button>
      </div>
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
                loading={queryLoadingPass}
                text='Actualizar'
              />
            </div>
          </form>
        </Card>
      </Collapse>
    </div>
  )
}

export default EditarPass;