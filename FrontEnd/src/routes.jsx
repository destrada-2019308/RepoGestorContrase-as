import React from 'react'
import { LoginPage } from './Pages/Auth/LoginPage'
import { RegisterPage } from './Pages/Auth/RegisterPage'

export const routes = [
    {path: '/', element: <LoginPage/>},
    {path: '/register', element: <RegisterPage/>}
]
