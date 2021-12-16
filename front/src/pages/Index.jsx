import React, { useEffect } from 'react';
import { GET_PROJECTSLED } from 'graphql/proyectos/queries';
import { useUser } from 'context/userContext';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from 'components/Spinner';
import { Button } from 'reactstrap';
import { GET_INSCRIPCIONESPROYECTOS } from 'graphql/inscripciones/queries';
import { toast } from 'react-toastify';

const Index = () => {

  const { userData } = useUser();
  const lider = userData._id;
  const estudiante = userData._id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery(GET_PROJECTSLED, {
    variables: { lider }
  });

  const {
    data: queryDataInscription,
    error: queryErrorInscription,
    loading: queryLoadingInscription
  } = useQuery(GET_INSCRIPCIONESPROYECTOS, {
    variables: { estudiante }
  });

  useEffect(() => {
    if (queryErrorInscription) {
      toast.error("Error consultando los proyectos.");
    }
    if (queryError) {
      toast.error("Error consultando los proyectos liderados.");
    }
  }, [queryErrorInscription, queryError]);

  if (queryLoading || queryLoadingInscription) return <SpinnerLoading />;

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
                      <Link to={`/proyectos/${u._id}`} style={{ color: "white", textDecoration: "none" }}>
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
        <div>
          <div className='title'>
            <label>{userData.rol === 'LIDER' ? 'Proyectos Liderados' : 'Mis Proyectos'}</label>
          </div>
          <div className='content-projects'>
            {queryDataInscription && queryDataInscription.InscripcionesProyectos.map((u) => {
              return (
                <div>
                  {u.estado === "ACEPTADA" ?
                    <div className='content-card'>
                      <p className='title'>{u.proyecto.nombre}</p>
                      <hr />
                      <div>
                        <b className='date'>Fecha Inicio : {u.proyecto.fechaInicio.slice(0, 10)}</b>
                        <b className='date'>Fecha Fin : {u.proyecto.fechaFin.slice(0, 10)}</b>
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
                          <p> {' $' + u.proyecto.presupuesto}</p>
                          <p> {u.proyecto.fase}</p>
                          <p> {u.proyecto.estado}</p>
                          <p> {u.proyecto.lider.nombre + ' ' + u.proyecto.lider.apellido}</p>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <b className='date-inscription'>Fecha Ingreso : {u.fechaIngreso.slice(0, 10)}</b>
                        {u.proyecto.fase === 'TERMINADO' || u.proyecto.estado === 'INACTIVO' ? <b className='date-inscription'>Fecha Egreso : {u.fechaEgreso.slice(0, 10)}</b> : <br/> }
                      </div>
                      <hr />
                      <div></div>
                      <p>
                        <Button color='primary'>
                          <Link to={`/proyecto/${u.proyecto._id}`} style={{ color: "white", textDecoration: "none" }}>
                            Ver Detalles
                          </Link>
                        </Button>
                      </p>
                    </div> : <br />
                  }
                </div>
              )
            })

            }
          </div>
        </div> : <br />
      }

    </div>
  );
};

export default Index;