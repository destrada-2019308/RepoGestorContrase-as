import React from 'react'
import Register from '../../Components/Register'
import { GetUsers } from '../../Components/GetUsers'
import { PasswordGenerator } from '../../Components/PasswordGenerator'

export const RegisterPage = () => {
  return (
    <div className='m-4 p-4 vh-100 row justify-content-center align-items-center'>
        <div className='col-auto'>
            <Register/>
            
        </div>
        <div className="col-auto">
        <PasswordGenerator/>
        </div>
        <GetUsers/>
    </div>
    
  )
}
