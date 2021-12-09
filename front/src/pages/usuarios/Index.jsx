import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';
import { Button, Table } from 'reactstrap';
import { InputSearch } from 'components/InputSearch';
import  { SpinnerLoading } from 'components/Spinner';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    console.log('data servidor', data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los usuarios");
    }
  }, [error]);

  if (loading) return <SpinnerLoading/>;

  return (
    <div>
      <div className='title'>
        <label>Listado de Usuarios</label>
        <InputSearch placeholder='Buscar usuario por nombre o identificación'/>
      </div>
      <Table striped className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.Users.map((u) => {
            return (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>{u.identificacion}</td>
                <td>{Enum_Rol[u.rol]}</td>
                <td>{Enum_EstadoUsuario[u.estado]}</td>
                <td>
                  <Button color='primary'>
                    <Link to={`/usuarios/editar/${u._id}`} style={{ color: "white", textDecoration: "none" }}>
                      Editar
                    </Link>
                  </Button>
                </td>
              </tr>
            )
          })

          }
        </tbody>
      </Table>
    </div>
  )
}

export default IndexUsuarios
