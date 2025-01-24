import React from 'react';
// import logo from "./assets/curaj-logo.png";
// import loginlogo from "./assets/lost.jpeg";
import { createBrowserRouter,RouterProvider } from 'react-router';
import Layout from './layout/authLayout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  }
])

const App=()=>{
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}



export default App;
