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


  useEffect(() => {
    if (queryData) {
      console.log("proyecto", queryData);
    }
  }, [queryData]);


  return (
    <div>
      <div className='title'>
        <label>{userData.rol === 'LIDER' ? 'Proyectos liderados' : 'Mis Proyectos'}</label>
          <InputSearch
            placeholder='Buscar proyecto por nombre'
            // onChange={e => setTerm(e.target.value)}
          />
      </div>
      <div>
        {queryData && queryData.ProyectosLiderados.map((u) => {
          return (
            <div>
                <p>{u.nombre}</p>
                <p>{u.presupuesto}</p>
                <p>{u.fase}</p>
                <p>{u.estado}</p>
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
    </div>
  );
};

export default Index;