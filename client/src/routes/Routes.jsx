import { Routes as RRRoutes, Route } from 'react-router-dom';
import { Home, Register, Login } from '../pages/index';

const Routes = () => {
  return (
    <RRRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </RRRoutes>
  );
};

export default Routes;