//Librerias

import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';

//Layouts

import PrivateLayout from './layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';

//Pages

import Index from './pages/Index';
import IndexUsuarios from 'pages/usuarios/Index';
import EditarUsuario from 'pages/usuarios/Editar';
import Register from 'pages/auth/registro';
import Login from 'pages/auth/login';
import IndexInscripciones from 'pages/inscripciones/Index';
import IndexProyecto from "pages/proyectos/IndexProyecto";
import EditarProyectos from "pages/proyectos/EditarProyectos";
import CrearProyecto from 'pages/proyectos/CrearProyecto';
import ListarObjetivos from 'pages/proyectos/ListarObjetivos';
import EditarObjetivo from 'pages/proyectos/EditarObjetivo';
import AgregarObjetivo from 'pages/proyectos/AgregarObjetivo';

//Contextos

import { UserContext } from 'context/userContext';
import { AuthContext } from 'context/authContext';

// Estilos

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/table.css';
import './styles/globals.css';
import 'styles/inputSearch.css';
import 'styles/spinner.css'
import Perfil from 'pages/usuarios/Perfil';
import EditarPass from 'pages/usuarios/EditarPass';
import IndexAvances from './pages/avances/Index';
import EditarDescripcion from 'pages/avances/EditarDescripcion';
import EditarObservacion from 'pages/avances/EditarObservacion';
import CrearAvance from 'pages/avances/CrearAvances';

const httpLink = createHttpLink({
  uri: "https://server-back-workbot.herokuapp.com/graphql"
  //  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', //Cada vez que se haga una request se enviara en los headers uno mas llamado autorizacion
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

function App() {

  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        correo: decoded.correo,
        identificacion: decoded.identificacion,
        rol: decoded.rol,
      });
    }
  }, [authToken])

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
                <Route path='/proyectos' element={<IndexProyecto />} />
                <Route path='/proyectos/listaObjetivos/:_id' element={<ListarObjetivos />} />
                <Route
                  path='/proyectos/editarObjetivos/:id/:indexObjetivo/:tipo/:descripcion'
                  element={<EditarObjetivo />}
                />
                <Route path='/proyectos/agregarObjetivo/:id' element={<AgregarObjetivo />} />
                <Route path='/proyectos/editar/:_id' element={<EditarProyectos />} />
                <Route path='/proyectos/crear' element={<CrearProyecto />} />
                <Route path='/profile/:_id' element={<Perfil />} />
                <Route path='/change-password/:_id' element={<EditarPass />} />
                <Route path='/avance/proyecto/:_id' element={<IndexAvances />} />
                <Route path='/avance/editar/descripcion/:_id' element={<EditarDescripcion />} />
                <Route
                  path='/avance/editar/observacion/:id/:observacion/:indexObservacion'
                  element={<EditarObservacion />}
                />
                <Route path='/crear/avances/:_id' element={<CrearAvance />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
