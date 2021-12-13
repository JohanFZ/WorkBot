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
// import Page2 from './pages/Page2';
// import IndexCategory1 from './pages/category1/Index';
// import Category1 from './pages/category1/CategoryPage1';
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

//Contextos

import { UserContext } from 'context/userContext';
import { AuthContext } from 'context/authContext';

// Estilos

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/table.css';
import './styles/globals.css';
import 'styles/inputSearch.css';
import 'styles/spinner.css'

const httpLink = createHttpLink({
  uri: "https://server-back-workbot.herokuapp.com/graphql"
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
                <Route path="/proyectos" element={<IndexProyecto />} />
                <Route path="/proyectos/listaObjetivos/:_id" element={<ListarObjetivos />} />
                <Route path="/proyectos/editarObjetivos/:id/:indexObjetivo/:tipo/:descripcion" element={<EditarObjetivo />} />
                <Route path="/proyectos/editar/:_id" element={<EditarProyectos />} />
                <Route path="/proyectos/crear" element={<CrearProyecto />} />
                {/* <Route path='page2' element={<Page2 />} /> */}
                {/* <Route path='category1' element={<IndexCategory1 />} /> */}
                {/* <Route path='category1/page1' element={<Category1 />} /> */}
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
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
