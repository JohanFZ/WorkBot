import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../assets/logo512.png';
import {FaUserAlt, FaHome, FaProjectDiagram, FaArchive, FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <ProSidebar className='sidebar'>
      <SidebarHeader className='sidebar-header'>
        <img src={logo} alt="" />
        <p>WorkBot</p>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape='square'>
          <MenuItem icon={<FaHome />} suffix={<span className='badge-red'>'new'</span>}>Dashboard</MenuItem>
          <SubMenu title='Usuarios' icon={<FaUserAlt/>}>
            <MenuItem>
              Listar Usuarios
              <Link to="/usuarios" />
            </MenuItem>
            <MenuItem>Actualizar Usuarios</MenuItem>
          </SubMenu>
          <SubMenu title='Proyectos' icon={<FaArchive />}>
            <MenuItem>Crear Proyectos</MenuItem>
            <MenuItem>
            Listar Proyectos
            </MenuItem>
          </SubMenu>
          <SubMenu title='Avances' icon={<FaProjectDiagram />}>
            <MenuItem>Crear Avances</MenuItem>
            <MenuItem>Listar Avances</MenuItem>
          </SubMenu>
          <SubMenu title='Inscripciones' icon={<FaAddressBook />}>
            <MenuItem>Crear Inscripciones</MenuItem>
            <MenuItem>Listar Inscripciones</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter className='sidebar-footer'>
        <p>Todos los derechos reservados para WorkBot.</p>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;