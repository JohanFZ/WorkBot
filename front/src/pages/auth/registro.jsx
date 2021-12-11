import React, { useEffect } from 'react'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import InputGlobal from 'components/InputGlobal';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enum';
import { REGISTRO } from 'graphql/auth/mutations';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import ParticlesBg from 'particles-bg';
import { useAuth } from 'context/authContext';

const Register = () => {

  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO)

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    registro({ variables: formData })
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Usuario Creado");
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate("/");
      }
    }
  }, [dataMutation, setToken, navigate]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error creando el usuario");
    }
  }, [errorMutation]);

  return (
    <div className='register'>
      <ParticlesBg color='#0d6efd' num={70} type='cobweb' bg={true}/>
      <h1 className='title'>Regístrate</h1>
      <form className='form' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div>
          <InputGlobal label='Nombre' name='nombre' type="text" required />
          <InputGlobal label='Apellido' name='apellido' type="text" required />
        </div>
        <div>
          <InputGlobal label='Documento' name='identificacion' type="text" required />
          <InputGlobal label='Correo' name='correo' type="email" required />
        </div>
        <div>
          <InputGlobal label='Contraseña' name='password' type="password" required />
          <DropDown label="Rol Deseado:" name='rol' required={true} options={Enum_Rol} />
        </div>
        <div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text="Registrarme"
        />
        </div>
      </form>
      <span className='label'>¿Ya tienes una cuenta? </span>
      <Link to="/auth/login">
        <span className='label'>Inicia sesión</span>
      </Link>
    </div>
  )
}

export default Register;
