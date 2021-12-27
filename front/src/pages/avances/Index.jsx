import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "graphql/proyectos/queries";
import { SpinnerLoading } from "components/Spinner";
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from 'context/userContext';
import { useParams } from 'react-router';
import { GET_AVANCES } from 'graphql/avances/queries';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputGlobal from 'components/InputGlobal';
import useFormData from 'hooks/useFormData';
import { EDITAR_DESCRIPTION } from 'graphql/avances/mutations';

const IndexAvances = () => {

  const { userData } = useUser();
  const { _id } = useParams();
  const proyecto = _id;
  const [idAvance, setIdAvance] = useState(null);
  const [estado, setEstado] = useState(false);
  const [estadoCrear, setEstadoCrear] = useState(false);
  const [formu, setForm] = useState([]);
  const { form, formData, updateFormData } = useFormData(null);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery(GET_PROJECT, {
    variables: { _id }
  });


  const {
    data: dataQuery,
    error: errorQuery,
    loading: loadingQuery
  } = useQuery(GET_AVANCES, {
    variables: { proyecto }
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    // editarUsuario({
    //   variables: { _id, ...formData }
    // })
  };

  const abrirModal = (data) => {
    // console.log(data[1]);
    setForm(data);
    setEstado(!estado);
  }

  useEffect(() => {
    if (dataQuery) {
      console.log("Avances",dataQuery.AdvancesProject);
    }
    if (queryError) {
      toast.error("Error consultando el Proyecto");
    }
    if (errorQuery) {
      toast.error("Error consultado los avances");
    }
  }, [queryError, errorQuery]);

  if (queryLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className='content-edit'>
      <Link to={`/`}>
        <i className='fas fa-arrow-left back' />
      </Link>
      <div className="title">
        <label>Datos del Proyecto</label>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Lider</th>
            <th>Correo Lider</th>
            <th>Fase</th>
            <th>Estado</th>
            <th>Objetivos</th>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <th>Avances</th>
            </PrivateComponent>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr key={queryData.ProyectoUnico._id}>
            <td>{queryData.ProyectoUnico.nombre}</td>
            <td>{queryData.ProyectoUnico.lider.nombre + " " + queryData.ProyectoUnico.lider.apellido}</td>
            <td>{queryData.ProyectoUnico.lider.correo}</td>
            <td>{queryData.ProyectoUnico.fase}</td>
            <td>{queryData.ProyectoUnico.estado}</td>
            <td>
              <Button outline color="primary">
                <Link
                  to={`/proyectos/listaObjetivos/${queryData.ProyectoUnico._id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Ver detalle
                </Link>
              </Button>
            </td>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <td>
                <Button outline color="primary">
                  <Link
                    to={`/crear/avances/${queryData.ProyectoUnico._id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Crear Avance
                  </Link>
                </Button>
              </td>
            </PrivateComponent>
            <td>
              <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                <Button outline color="primary">
                  <Link
                    to={`/proyectos/editar/${queryData.ProyectoUnico._id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Editar
                  </Link>
                </Button>
              </PrivateComponent>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="title">
        <label>Avances del Proyecto</label>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Nombre del Estudiante</th>
            <th>Correo</th>
            <th>Fecha del Avance</th>
            <th>Descripción</th>
            <th>Observaciones</th>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <th>Opciones</th>
            </PrivateComponent>
          </tr>
        </thead>
        <tbody style={{ fontSize: "15px" }}>
          {
            dataQuery && dataQuery.AdvancesProject.map((a) => {
              return (
                <tr key={a._id}>
                  <td>{a.creadoPor.nombre + " " + a.creadoPor.apellido}</td>
                  <td>{a.creadoPor.correo}</td>
                  <td>{a.fecha.slice(0, 10)}</td>
                  <td>{a.descripcion}</td>
                  <td style={{ display: "flex" }}>
                    <Button onClick={() => {
                      abrirModal([a.observaciones, a._id]);
                    }} outline color="primary" style={{ margin: "10px", width: "130px" }}>
                      Ver Observaciones
                    </Button>
                    <PrivateComponent roleList={["LIDER"]}>
                      <Button onClick={() => {
                        setEstadoCrear(!estadoCrear);
                      }} outline color="primary" style={{ margin: "10px", fontSize: "13px" }}>
                        Crear Observación
                      </Button>
                    </PrivateComponent>
                  </td>
                  <td>
                    {userData._id === a.creadoPor._id ?
                      <PrivateComponent roleList={["ESTUDIANTE"]}>
                        <Link to={`/avance/editar/descripcion/${a._id}`}>
                          <Button outline color="primary">
                            Editar Descripción de Avance
                          </Button>
                        </Link>
                      </PrivateComponent> : <br />
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {/* <Modal isOpen={estado}>
        <ModalHeader>Observaciones</ModalHeader>
        <ModalBody>
          {
            formu[0] && formu[0].map((o, i) => {
              return (
                <div>
                  <p className='label'>Observacion #{i + 1 + " "}</p>
                  <div style={{display:"flex", marginBottom:"20px"}}>
                    <p className='label' style={{ fontWeight: "300", marginRight:"100px" }} key={i}>{o.descripcion}</p>
                    <Link to={`/avance/editar/observacion/${formu[1]}/${o.descripcion}/${i}`}>
                      <Button outline color="primary">
                        Editar Observacion
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            setEstado(!estado)
          }} outline color="primary">
            Salir
          </Button>
        </ModalFooter>
      </Modal> */}

      <Modal isOpen={estadoCrear}>
        <ModalHeader>Crear observación</ModalHeader>
        <ModalBody className='form'>
          <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            className='form'
          >
            <div>
              <InputGlobal
                label='Observación :'
                type='textarea'
                name='observaciones'
                required={true}
              />
            </div>
            <div>
              <Button outline color="primary">
                Guardar
              </Button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            setEstadoCrear(!estadoCrear);
          }} outline color="primary">
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default IndexAvances;
