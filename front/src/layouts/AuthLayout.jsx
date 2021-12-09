import React from 'react';
import { Outlet } from 'react-router';


const AuthLayout = () => {
  return (
    <div>
      <div>
          {/* Este es el layout de autenticacion */}
          <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout
