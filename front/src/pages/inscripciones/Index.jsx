import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { toast } from 'react-toastify';
import { Button, Table } from 'reactstrap';
import { InputSearch } from 'components/InputSearch';
import { Link } from 'react-router-dom'
import {FaCheck,   FaTimes  } from 'react-icons/fa';
import { SpinnerLoading } from 'components/Spinner';
import { useUser } from 'context/userContext';


const IndexInscripciones = () => {
  const { userData } = useUser();
  let lider = null 
  if(userData.rol === "LIDER"){
    lider = userData._id;
  }
  
  const { data:dataQueryInscripciones, 
    loading:loadingQueryInscripciones, 
    error:errorQueryInscripciones, 
    refetch: refetchQueryInscripciones} = useQuery(GET_INSCRIPCIONES);
  const [aprobarInscripcion, 
    { data:dataMutatationAprobar, 
      loading:loadingMutatationAprobar, 
      error:errorMutatationAprobar}] = useMutation(APROBAR_INSCRIPCION);
  const [rechazarInscripcion, 
    { data:dataMutatationRechazar, 
      loading:loadingMutatationRechazar, 
      error:errorMutatationRechazar}] = useMutation(RECHAZAR_INSCRIPCION);
  
  const [dataQuery, setDataQuery] = useState(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    console.log(dataQueryInscripciones);
 //   if(lider){
  //    dataQueryInscripciones = dataQueryInscripciones.proyecto.lider.filter ((lider) => {
  //      console.log(lider)
  //    })
  //  }

  }, [dataQueryInscripciones]);

  useEffect(() => {
    if (dataMutatationAprobar) {
      toast.success("Inscripción Aprobada");
      refetchQueryInscripciones()
    }
    if (dataMutatationRechazar) {
      toast.success("Inscripción Rechazada");
      refetchQueryInscripciones()
    }
  }, [dataMutatationAprobar, dataMutatationRechazar]);

  useEffect(() => {
    if (errorQueryInscripciones) {
      toast.error("Error buscando las inscripciones");
    }
    if (errorMutatationAprobar) {
      toast.error("Error actualizando la inscripción");
    }
    if (errorMutatationRechazar) {
      toast.error("Error rechazando la inscripción");
    }
  }, [errorQueryInscripciones, errorMutatationAprobar, errorMutatationRechazar]);


  if (loadingQueryInscripciones || 
    loadingMutatationAprobar || 
    loadingMutatationRechazar) return <SpinnerLoading />


  function searchingUserperName(term) {
    return function (x) {
      return x.identificacion.includes(term) || !term;
    }
  }

  const cambiarEstadoInscripcion = (inscripcion, estado) => {
    if(estado === "APROBAR"){
      aprobarInscripcion({
        variables: {
          aprobarInscripcionId: inscripcion._id,
        },
      });
    }
    if(estado === "RECHAZAR"){
      rechazarInscripcion({
        variables: {
          rechazarInscripcionId: inscripcion._id,
        },
      });
    }
  };
  
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
        {dataQueryInscripciones && dataQueryInscripciones.Inscripciones.map((u) => {
          return (
            
              ((userData.rol === "LIDER" && u.proyecto.lider._id === userData._id) || userData.rol === "ADMINISTRADOR") && (
                <tr key={u._id}>
                <td>{u.estado}</td>
                <td>{u.fechaIngreso}</td>
                <td>{u.fechaEgreso}</td>
                <td>{u.proyecto.nombre}</td>
                <td>{u.estudiante.nombre + " " + u.estudiante.apellido}</td>
                <td>
                {                                           
                  <button 
                    className="btn btn-outline-primary btn-sm" 
                    title="Aceptar" 
                    onClick={() => {
                      cambiarEstadoInscripcion(u,"APROBAR");
                    }}
                  >{<FaCheck />}</button>
                }
                {
                  <button 
                  className="btn btn-outline-danger btn-sm" 
                  title="Rechazar" 
                  onClick={() => {
                    cambiarEstadoInscripcion(u,"RECHAZAR");
                  }}
                  >{<FaTimes />}</button>
                }
                </td>
              </tr>

              )
          



          )
        })

        }
      </tbody>
    </Table>
  </div>


  );
};



export default IndexInscripciones;