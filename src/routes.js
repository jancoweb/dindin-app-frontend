import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import SignIn from './pages/Sign-in';
import Login from './pages/Login';
import Main from './pages/Main';

import { getItemf } from './utils/functions';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItemf('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}


function MainRoute() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Sign-in' element={<SignIn />} />
      <Route element={<ProtectedRoutes redirectTo={'/'} />}>
        <Route path='/Main' element={<Main />}></Route>

      </Route>
    </Routes>
  );
}

export default MainRoute;
