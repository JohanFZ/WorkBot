import React, { useEffect } from 'react';
import InputGlobal from 'components/InputGlobal';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const { setToken } = useAuth();

  const { form, formData, updateFormData } = useFormData();

  const [login, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: formData
    })
  };

  useEffect(() => {
    if (mutationData) {
      console.log(mutationData);
      if (mutationData.login.token) {
        setToken(mutationData.login.token);
        navigate("/");
      }
      else if (mutationData.login.error === "Contraseña incorrecta"){
        toast.error("Contraseña Incorecta");
      }
      else if (mutationData.login.error === "El usuario no existe") {
        toast.error("Usuario no Existente");
      }
      else if (mutationData.login.error === "Su cuenta esta en estado pendiente") {
        toast.warning("La cuenta no ha sido autorizada por el momento, vuelva a intentar más tarde.");
      }
      else if (mutationData.login.error === "Su cuenta no esta autorizada") {
        toast.error("Su cuenta no esta autorizada");
      }
    }
  }, [mutationData, setToken, navigate]);

  return (
    <div className='login'>
      <ParticlesBg color='#0d6efd' num={60} type='cobweb' bg={true} />
      <h1 className='title'>Iniciar Sesión</h1>
      <form className='form' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <InputGlobal name='correo' type='email' label='Correo' required={true} />
        <InputGlobal name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Iniciar Sesión'
        />
      </form>
      <span className='label'>¿No tienes cuenta? </span>
      <Link to='/auth/register'>
        <span className='label'>Regístrate</span>
      </Link>
    </div>
  )
}

export default Login
