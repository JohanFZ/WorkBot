import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { Button, Table } from 'reactstrap';
import { InputSearch } from 'components/InputSearch';
import { Link } from 'react-router-dom'
import {FaCheck,   FaArchive } from 'react-icons/fa';

const IndexInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);
  
  const [dataQuery, setDataQuery] = useState(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <div>Loading...</div>;


  function searchingUserperName(term) {
    return function (x) {
      return x.identificacion.includes(term) || !term;
    }
  }
  return (


    <div>
    <div className='title'>
      <label>Inscripciones</label>
      {dataQuery && (
        <InputSearch
          placeholder='Buscar usuario por identificación'
          onChange={e => setTerm(e.target.value)}
        />
      )}
    </div>
    <Table striped className='table'>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Fecha de Ingreso</th>
          <th>Fecha de Egreso</th>
          <th>Proyecto</th>
          <th>Estudiante</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.Inscripciones.map((u) => {
          return (
            <tr key={u._id}>
              <td>{u.estado}</td>
              <td>{u.fechaIngreso}</td>
              <td>{u.fechaEgreso}</td>
              <td>{u.proyecto.nombre}</td>
              <td>{u.estudiante.nombre + " " + u.estudiante.apellido}</td>
              <td>
              {                               
                <Link to={`/`}>
                    <button className="btn btn-outline-primary btn-sm" title="Aceptar">{<FaCheck />}</button>
                </Link>
              }
              {                               
                <Link to={`/`}>
                    <button className="btn btn-outline-danger btn-sm" title="Rechazar" >{<FaArchive />}</button>
                </Link>
              }
              </td>
            </tr>
          )
        })

        }
      </tbody>
    </Table>
  </div>


  );
};



export default IndexInscripciones;