import React, { useEffect } from 'react';
import { GET_PROJECTSLED } from 'graphql/proyectos/queries';
import { useUser } from 'context/userContext';
import useFormData from 'hooks/useFormData';
import { useQuery, useMutation } from '@apollo/client';
import { InputSearch } from 'components/InputSearch';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { Button } from 'reactstrap';

const Index = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { userData } = useUser();
  const lider = userData._id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery(GET_PROJECTSLED, {
    variables: { lider }
  });

  const formatDate = (date) => {
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return formatted_date;
  }


  useEffect(() => {
    if (queryData) {
      console.log("proyecto", queryData);
    }
  }, [queryData]);


  return (
    <div>
      {userData.rol === 'LIDER' ?
        <div>
          <div className='title'>
          <label>{userData.rol === 'LIDER' ? 'Proyectos Liderados' : 'Mis Proyectos'}</label>
          {/* <InputSearch
            placeholder='Buscar proyecto por nombre'
          // onChange={e => setTerm(e.target.value)}
          /> */}
        </div>
          <div className='content-projects'>
            {queryData && queryData.ProyectosLiderados.map((u) => {
              return (
                <div className='content-card'>
                  <p className='title'>{u.nombre}</p>
                  <hr />
                  <div>
                    <b className='date'>Fecha Inicio : {u.fechaInicio.slice(0, 10)}</b>
                    <b className='date'>Fecha Fin : {u.fechaFin.slice(0, 10)}</b>
                  </div>
                  <hr />
                  <div className='content-card-info'>
                    <div>
                      <p>Presupuesto : </p>
                      <p>Fase : </p>
                      <p>Estado : </p>
                      <p>Lider : </p>
                    </div>
                    <div>
                      <p> {' $' + u.presupuesto}</p>
                      <p> {u.fase}</p>
                      <p> {u.estado}</p>
                      <p> {u.lider.nombre + ' ' + u.lider.apellido}</p>
                    </div>
                  </div>
                    <div></div>
                  <p>
                    <Button color='primary'>
                      <Link to={`/usuarios/editar/${u._id}`} style={{ color: "white", textDecoration: "none" }}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </p>
                </div>
              )
            })

            }
          </div>
        </div> : <br />
      }

      {userData.rol === 'ESTUDIANTE' ?
        <div><div className='title'>
          <label>{userData.rol === 'LIDER' ? 'Proyectos Liderados' : 'Mis Proyectos'}</label>
          <InputSearch
            placeholder='Buscar proyecto por nombre'
          // onChange={e => setTerm(e.target.value)}
          />
        </div>
        </div> : <br />
      }

    </div>
  );
};

export default Index;