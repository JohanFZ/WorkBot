import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  return (
    <div>
      <div>
          {/* Este es el layout de autenticacion */}
          <Outlet />
        </div>
      <ToastContainer />
    </div>
  )
}

export default AuthLayout
