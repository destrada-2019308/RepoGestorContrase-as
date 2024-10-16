import React from 'react'
import { LoginPage } from './Pages/Auth/LoginPage'
import { RegisterPage } from './Pages/Auth/RegisterPage'
import { PasswordClient } from './Components/PasswordClient'

export const routes = [
    {path: '/', element: <LoginPage/>},
    {path: '/register', element: <RegisterPage/>},
    {path: '/password', element: <PasswordClient/>},
]
