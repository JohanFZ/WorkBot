import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../assets/logo512.png';
import {FaUserAlt, FaHome, FaProjectDiagram, FaArchive, FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PrivateComponent from './PrivateComponent';
import { useAuth } from 'context/authContext';
import { useUser } from 'context/userContext';


const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <li  onClick={() => deleteToken()}>
      <Link to='/auth/login'>
        <div className='logout'>
          <i className='fas fa-sign-out-alt' />
        </div>
      </Link>
    </li>
  )
}

const Sidebar = () => {

  const { userData } = useUser();

  return (
    <ProSidebar className='sidebar'>
      <SidebarHeader className='sidebar-header'>
        <img src={logo} alt="" />
        <p>WorkBot</p>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape='square'>
          <MenuItem icon={<FaHome />} suffix={<span className='badge-red'>'new'</span>}>Dashboard</MenuItem>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <SubMenu title='Usuarios' icon={<FaUserAlt/>}>
              <MenuItem>
                Listar y Editar Usuarios
                <Link to="/usuarios" />
              </MenuItem>
            </SubMenu>
          </PrivateComponent>
          <SubMenu title='Proyectos' icon={<FaArchive />}>
            <MenuItem>
            Crear Proyectos
            <Link to="/proyectos/crear"/>
            </MenuItem>
            <MenuItem>
            Listar Proyectos
            <Link to="/proyectos"/>
            </MenuItem>
          </SubMenu>
          <SubMenu title='Avances' icon={<FaProjectDiagram />}>
            <MenuItem>Crear Avances</MenuItem>
            <MenuItem>Listar Avances</MenuItem>
          </SubMenu>
          <SubMenu title='Inscripciones' icon={<FaAddressBook />}>
            <MenuItem>
              Crear Inscripciones
              <Link to="/inscripciones" />
            </MenuItem>
            <MenuItem>
              Listar Inscripciones
              <Link to="/inscripciones" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter className='sidebar-footer'>
        <div className='info-user'>
          <p className='username'>{userData.nombre + " " + userData.apellido}</p>
          <p className='rol'>{userData.rol}</p>
          <Link to="/usuarios">
            <li className='profile'>Mi Perfil</li>
          </Link>
        </div>
        <div className='logout'>
          <Logout/>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;