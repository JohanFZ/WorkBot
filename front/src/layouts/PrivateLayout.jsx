import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { useMutation } from '@apollo/client';
import { VALIDATE_TOKEN } from 'graphql/auth/mutations';
import { useNavigate } from 'react-router-dom';
import { SpinnerLoading } from 'components/Spinner';

const PrivateLayout = () => {

  const navigate = useNavigate();

  const { authToken, setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [validateToken, { data: mutationData, loading: mutationLoading, error: mutationError }]
    = useMutation(VALIDATE_TOKEN);

  useEffect(() => {
    validateToken(); //Cambiar a refresh
  }, [validateToken])

  useEffect(() => {
    // console.log("DM", mutationData);
    if (mutationData) {
      if (mutationData.validateToken.token) {
        setToken(mutationData.validateToken.token);
      } else {
        setToken(null);
        navigate('/auth/login');
      }
      setLoadingAuth(false);
    }
  }, [mutationData, setToken, setLoadingAuth, navigate])

  // useEffect(() => {
  //   console.log("Token Actual", authToken);
  // }, [authToken]);

  if (mutationLoading || loadingAuth) return <SpinnerLoading />;

  return (
    <div className='main'>
      <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;