import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './fonts/Ruberoid/Ruberoid-Bold.otf'
import { RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import routerApp from './router/index';

import App from './App.jsx'
import '../dist/output.css'
import './custom.css'
import axios from 'axios'
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:
//   }
// ])
axios.defaults.baseURL="http://127.0.0.1:5001";
ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <main className='dark text-foreground'>
      <RouterProvider router={routerApp}></RouterProvider>
      </main>
    </NextUIProvider>
  
)
