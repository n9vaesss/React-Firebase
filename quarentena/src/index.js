import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/home/Home'
import Login from './pages/login/Login';
import PainelADM from './pages/painelADM/PainelADM';
import IncludeRegister from './pages/includeRegister/IncludeRegister';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>,
  },
  {
    path:'/home',
    element: <Home/>
  },
  {
    path: '/painelAdm',
    element: <PainelADM/>
  },
  {
    path: '/includeRegister',
    element: <IncludeRegister/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);

