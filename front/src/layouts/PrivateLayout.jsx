import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;