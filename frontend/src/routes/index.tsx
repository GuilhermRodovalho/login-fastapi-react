import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import { Route as PrivateRoute } from './Route';
import { PrivateRoute } from './Route'

import { Login } from '../pages/Login';
import SignUp from '../pages/SignUp';
import { Welcome } from '../pages/Welcome';
import Update from '../pages/Update';



export const routes: React.FC = () => (
  <Routes>

    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/home" element={<PrivateRoute />}>
      <Route path="" element={<Welcome />} />
    </Route>
    <Route path="/update" element={<PrivateRoute />}>
      <Route path="" element={<Update />} />
    </Route>

  </Routes>
);

