import React from 'react'
import Login from './Components/Login.jsx'
import { Toaster } from 'react-hot-toast'
import { routes } from './routes.jsx'
import { useRoutes } from 'react-router-dom'

export const App = () => {
  const element = useRoutes(routes)

  return (
    <>
    {element}
    <Toaster position='top-right' reverseOrder={false} />
    </>
  )
}

