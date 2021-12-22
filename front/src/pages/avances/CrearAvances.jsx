import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from 'context/userContext';
import { Link } from 'react-router-dom';
import InputGlobal from 'components/InputGlobal';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import { SpinnerLoading } from 'components/Spinner';
import { toast } from 'react-toastify';

const CrearAvance = ({ proyecto, setOpenDialog }) => {
  const { userData } = useUser();
  const { _id } = useParams();
  const { form, formData, updateFormData } = useFormData(null);

  const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log('Mutacion Edicion', mutationData);
  }, [mutationData]);

  useEffect(() => {
    console.log('Error en mutacion', mutationError);
  }, [mutationError]);

  if (mutationLoading) {
    return <SpinnerLoading />;
  }

  const submitForm = (e) => {
    e.preventDefault();

    crearAvance({
      variables: { ...formData, proyecto: _id, creadoPor: userData._id },
    }).then(() => {
      toast.success('avance creado con exito');
      //setOpenDialog(false);
    });
    /* .catch(() => {
          toast.success('Objetivo agregado');
        }); */
  };

  return (
    <div className='content-edit'>
      <Link to={`/`}>
        <i className='fas fa-arrow-left back' />
      </Link>
      <h1 className='title'>Crear Nuevo Avance</h1>
      <p>
        <form ref={form} onChange={updateFormData} onSubmit={submitForm} className='form'>
          <p>
            <InputGlobal name='descripcion' label='Descripción' type='textarea' requiered={true} />
          </p>
          <p>
            <InputGlobal name='fecha' label='Fecha' type='date' />
          </p>
          <p>
            <ButtonLoading
              text='Crear Avance'
              loading={mutationLoading}
              disabled={Object.keys(formData).length === 0}
            />
          </p>
        </form>
      </p>
    </div>
  );
};

export default CrearAvance;
