import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import routerApp from './router/index';

import App from './App.jsx'
import '../dist/output.css'
import './custom.css'
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:
//   }
// ])
ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <main className='dark text-foreground bg-background'>
      <App />
        <RouterProvider router={routerApp}></RouterProvider>
      </main>
    </NextUIProvider>
  
)
