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
      if (mutationData.login.token) {
        setToken(mutationData.login.token);
        navigate("/");
      }
    }
  }, [mutationData, setToken, navigate]);

  return (
    <div className='login'>
      <ParticlesBg color='#0d6efd' num={120} type='cobweb' bg={true} />
      <h1 className='title'>Iniciar Sesión</h1>
      <form className='form' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <InputGlobal name='correo' type='email' label='Correo' required={true} />
        <InputGlobal name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          // loading={loadingMutation}
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
